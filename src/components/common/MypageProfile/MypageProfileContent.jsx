// Link import
import '../../css/MypageProfile/MypageProfileContent.css';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

// Img import
import PremiumImg from '../../../img/MypageProfile/PremiumImg.svg';
import DefaultProfileIcon from '../../../img/MypageProfile/테스트프로필.png';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Const
export default function MypageProfileContent() {
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [originalData, setOriginalData] = useState({ nickname: '', intro: '', profileImage: '', fileName: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [fileName, setFileName] = useState('');
    const [pendingImageFile, setPendingImageFile] = useState(null); // 저장 전 대기 중인 이미지 파일
    const [previewImage, setPreviewImage] = useState(''); // 로컬 미리보기 URL
    const fileInputRef = useRef(null);

    // 프로필 정보 조회
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/my/profile');
            const { username, introduction, profileImageUrl } = response.data;
            
            // URL에서 파일명 추출 후 디코딩
            const extractedFileName = profileImageUrl 
                ? decodeURIComponent(profileImageUrl.split('/').pop()) 
                : '';
            
            setNickname(username || '');
            setIntro(introduction || '');
            setProfileImage(profileImageUrl || '');
            setFileName(extractedFileName);
            setOriginalData({
                nickname: username || '',
                intro: introduction || '',
                profileImage: profileImageUrl || '',
                fileName: extractedFileName
            });
        } catch (error) {
            console.error('프로필 조회 실패:', error);
            toast.error('프로필 정보를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 프로필 이미지 선택 (로컬 미리보기만, 저장 시 업로드)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 파일 유효성 검사
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('지원하지 않는 이미지 형식입니다.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB 제한
            toast.error('파일 크기는 5MB 이하여야 합니다.');
            return;
        }

        // 로컬 미리보기 URL 생성
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
        setPendingImageFile(file);
        setFileName(file.name);
    };

    // 실제 이미지 업로드 (저장 시 호출)
    const uploadImage = async (file) => {
        // Presigned URL 요청 (fileName을 쿼리 파라미터로 전송)
        const presignedResponse = await axiosInstance.get('/my/profile/image/presigned-url', {
            params: { fileName: file.name }
        });
        const { presignedUrl } = presignedResponse.data;

        // S3에 이미지 업로드
        await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        // 업로드된 이미지 URL 추출 (presigned URL에서 쿼리 파라미터 제거)
        return presignedUrl.split('?')[0];
    };

    // 프로필 저장
    const handleSave = async () => {
        if (!nickname.trim()) {
            toast.error('아이디를 입력해주세요.');
            return;
        }

        try {
            setIsSaving(true);

            // 대기 중인 이미지가 있으면 먼저 업로드
            let newProfileImageUrl = profileImage;
            if (pendingImageFile) {
                newProfileImageUrl = await uploadImage(pendingImageFile);
                setProfileImage(newProfileImageUrl);
            }

            await axiosInstance.patch('/my/profile', {
                username: nickname,
                introduction: intro
            });

            // 미리보기 URL 정리
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
                setPreviewImage('');
            }
            setPendingImageFile(null);

            setOriginalData({
                nickname,
                intro,
                profileImage: newProfileImageUrl,
                fileName
            });

            toast.success('프로필이 저장되었습니다.');
        } catch (error) {
            console.error('프로필 저장 실패:', error);
            toast.error('프로필 저장에 실패했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    // 취소 (원래 데이터로 복원)
    const handleCancel = () => {
        // 미리보기 URL 정리
        if (previewImage) {
            URL.revokeObjectURL(previewImage);
            setPreviewImage('');
        }
        setPendingImageFile(null);
        
        setNickname(originalData.nickname);
        setIntro(originalData.intro);
        setProfileImage(originalData.profileImage);
        setFileName(originalData.fileName);
        toast.info('변경사항이 취소되었습니다.');
    };

    // 파일 선택 버튼 클릭
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // 변경사항 확인
    const hasChanges = 
        nickname !== originalData.nickname || 
        intro !== originalData.intro || 
        profileImage !== originalData.profileImage ||
        pendingImageFile !== null;

    if (isLoading) {
        return (
            <div className='mypage-main loading-container'>
                <div className='spinner'></div>
            </div>
        );
    }

    return (
        <div className='mypage-main'>
            <div className='profile-setting-title'>
                프로필 설정 <img src={PremiumImg} alt="Premium" />
            </div>

            <div className='line'></div>

            <div className='profile-picture-title'>프로필 사진</div>

            <div className='profile-picture-container'>
                <div className='profile-picture'>
                    <img 
                        className='profile-icon' 
                        src={previewImage || profileImage || DefaultProfileIcon} 
                        alt="Profile" 
                    />
                </div>
                <div className='profile-upload-container'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <div className='profile-upload-button' onClick={handleUploadClick}>
                        사진 업로드
                    </div>
                    <div className='profile-upload-text'>
                        {fileName || (profileImage ? '현재 프로필 이미지' : '선택된 파일 없음')}
                    </div>
                </div>
            </div>
            
            <div className='profile-info-container'>
                <div className='profile-nickname-container'>
                    <div className='profile-nickname-title'>아이디</div>
                    <input 
                        className='profile-nickname-input' 
                        type="text" 
                        placeholder='아이디를 입력해주세요' 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                    />
                </div>

                <div className='profile-intro-container'>
                    <div className='profile-intro-title'>자기 소개</div>
                    
                    <textarea 
                        className='profile-intro-textarea' 
                        placeholder='자기 소개를 입력해주세요' 
                        value={intro} 
                        onChange={(e) => setIntro(e.target.value)} 
                        maxLength={250} 
                    />
                    
                    <div className='profile-intro-text-count'>({intro.length} / 250)</div>
                </div>
                
                {hasChanges && (
                    <div className='profile-save-button-container'>
                        <div 
                            className={`profile-button-save profile-button ${isSaving ? 'disabled' : ''}`}
                            onClick={!isSaving ? handleSave : undefined}
                        >
                            {isSaving ? '저장 중...' : '저장'}
                        </div>
                        <div 
                            className='profile-button-cancel profile-button'
                            onClick={handleCancel}
                        >
                            취소
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
