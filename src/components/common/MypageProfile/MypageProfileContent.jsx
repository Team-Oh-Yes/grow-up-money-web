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

    // 프로필 이미지 업로드
    const handleImageUpload = async (e) => {
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

        try {
            setFileName(file.name);
            
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
            const imageUrl = presignedUrl.split('?')[0];
            setProfileImage(imageUrl);
            
            toast.success('이미지가 업로드되었습니다.');
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            toast.error('이미지 업로드에 실패했습니다.');
        }
    };

    // 프로필 저장
    const handleSave = async () => {
        if (!nickname.trim()) {
            toast.error('닉네임을 입력해주세요.');
            return;
        }

        try {
            setIsSaving(true);
            await axiosInstance.patch('/my/profile', {
                username: nickname,
                introduction: intro
            });

            setOriginalData({
                nickname,
                intro,
                profileImage,
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
        profileImage !== originalData.profileImage;

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
                        src={profileImage || DefaultProfileIcon} 
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
                    <div className='profile-nickname-title'>닉네임</div>
                    <input 
                        className='profile-nickname-input' 
                        type="text" 
                        placeholder='닉네임을 입력해주세요' 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                    />
                </div>

                <div className='profile-intro-container'>
                    <div className='profile-intro-title'>소개글</div>
                    
                    <textarea 
                        className='profile-intro-textarea' 
                        placeholder='소개글을 입력해주세요' 
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
