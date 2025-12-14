// Link import
import '../../css/MypageProfile/MypageProfileContent.css';

// Img import
import PremiumImg from '../../../img/MypageProfile/PremiumImg.svg';
import ProfileIcon from '../../../img/MypageProfile/테스트프로필.png';

// Const
export default function MypageProfileContent() {
    return (
        <div className='mypage-main'>
            <div className='profile-setting-title'>
                프로필 설정 <img src={PremiumImg} alt="Premium" />
            </div>

            <div className='line'></div>

            <div className='profile-picture-title'>프로필 사진</div>
            <div className='profile-picture'>
                <img className='profile-icon' src={ProfileIcon} alt="Profile" />
            </div>
        </div>
    );
}
