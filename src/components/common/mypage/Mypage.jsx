function Mypage(){
    return (
        <div className="mypage-profile-container">
            {/* 탭 메뉴 */}
            <div className="profile-tabs">
                <div className="tab active">프로필</div>
                <div className="tab">사용자 통계</div>
                <div className="tab">정구 설정</div>
                <div className="tab">개인정보 보정</div>
                <div className="tab">환불/문의</div>
            </div>

            {/* 프로필 설정 섹션 */}
            <div className="profile-content">
                <div className="profile-title">프로필 설정 👑</div>
                <div className="line"></div>
                
                <div className="profile-main">
                    {/* 왼쪽 영역 */}
                    <div className="profile-left">
                        {/* 프로필 사진 */}
                        <div className="profile-image-section">
                            <label className="section-label">프로필 사진</label>
                            <div className="image-upload-area">
                                <div className="profile-avatar">
                                    {/* 프로필 이미지 */}
                                </div>
                                <button className="upload-btn">파일 선택</button>
                                <span className="file-name">키타기와 마린.png</span>
                            </div>
                        </div>

                        {/* 닉네임 */}
                        <div className="form-field">
                            <label className="field-label">닉네임</label>
                            <input type="text" className="field-input" placeholder="세토당이리" />
                        </div>

                        {/* 자기 소개 */}
                        <div className="form-field">
                            <label className="field-label">자기 소개</label>
                            <textarea className="field-textarea" placeholder="안녕하세요"></textarea>
                            <div className="char-count">(23 / 250)</div>
                        </div>
                    </div>

                    {/* 오른쪽 영역 - NFT */}
                    <div className="profile-right">
                        <div className="nft-section">
                            <label className="section-label">대표 NFT</label>
                            <div className="nft-display">
                                {/* NFT 이미지 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;