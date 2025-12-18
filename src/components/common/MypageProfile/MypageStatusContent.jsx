// Link import
import '../../css/MypageProfile/MypageStatusContent.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Const
export default function MypageStatusContent() {
    const [userStatus, setUserStatus] = useState({ totalEarnedBoundPoint: '', totalEarnedPoints: '', userRank: '', percentage: '' });
    const [isLoading, setIsLoading] = useState(true);

    // 사용자 통계 조회
    useEffect(() => {
        fetchUserStatus();
    }, []);

    const fetchUserStatus = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/my/statistics');
            const { totalEarnedBoundPoint, totalEarnedPoints, userRank, percentage, themeProgresses } = response.data;

            let overallPercentage = percentage || 0;
            if (Array.isArray(themeProgresses) && themeProgresses.length > 0) {
                const hasLessons = themeProgresses.every(t => typeof t.totalLessons === 'number' && t.totalLessons > 0);
                if (hasLessons) {
                    const totalLessons = themeProgresses.reduce((sum, t) => sum + (t.totalLessons || 0), 0);
                    const weightedSum = themeProgresses.reduce((sum, t) => sum + ((t.progressPercentage || 0) * (t.totalLessons || 0)), 0);
                    overallPercentage = totalLessons ? Math.round(weightedSum / totalLessons) : Math.round(themeProgresses.reduce((s,t)=>s+(t.progressPercentage||0),0)/themeProgresses.length);
                } else {
                    overallPercentage = Math.round(themeProgresses.reduce((s, t) => s + (t.progressPercentage || 0), 0) / themeProgresses.length);
                }
            }
            
            setUserStatus({
                totalEarnedBoundPoint: totalEarnedBoundPoint || '',
                totalEarnedPoints: totalEarnedPoints || '',
                userRank: userRank || '',
                percentage: overallPercentage
            });
        } catch (error) {
            console.error('사용자 통계 조회 실패:', error);
            toast.error('사용자 통계를 불러오는데 실패했습니다.');
            toast.clearWaitingQueue();
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className='mypage-main loading-container'>
                <div className='spinner'></div>
            </div>
        );
    }

    return (
        <div className='mypage-main'>
            <div className='profile-Info-title'>
                사용자 통계
            </div>

            <div className='line'></div>
            
            <div className='profile-Info-content'>
                <div className='profile-Info-content-item'>
                    <div className='profile-Info-setting-title'>누적 포인트</div>
                    <div className='profile-Info-setting-text'>{userStatus.totalEarnedPoints || '0'} 포인트</div>
                </div>

                <div className='profile-Info-content-item'>
                    <div className='profile-Info-setting-title'>누적 귀속 포인트</div>
                    <div className='profile-Info-setting-text'>{userStatus.totalEarnedBoundPoint || '0'} 포인트</div>
                </div>

                <div className='profile-Info-content-item'>
                    <div className='profile-Info-setting-title'>로드맵 진행도</div>
                    <div className='profile-Info-setting-text'>{userStatus.percentage || '0'}%</div>
                </div>

                <div className='profile-Info-content-item'>
                    <div className='profile-Info-setting-title'>현재 랭킹</div>
                    <div className='profile-Info-setting-text'>Top {userStatus.userRank || '1'}</div>
                </div>
            </div>
        </div>
    );
}
