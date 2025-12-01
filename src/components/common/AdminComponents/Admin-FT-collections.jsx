import { useState } from 'react';
import '../../css/Admincss/Admin-FT-collections.css';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import Popup from './Popup';

const AdminFTCollections = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        collectionName: '',
        serialNo: '',
        serialDisplay: '',
        tokenTypeDisplayName: '',
        ownerUsername: '',
        rarity: 'COMMON',
        rarityDisplayName: '',
        imageUrl: '',
        isOnSale: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        // 필수 필드 검증
        if (!formData.collectionName || !formData.ownerUsername) {
            toast.error("컬렉션명과 소유자 ID는 필수입니다.");
            return;
        }

        try {
            const payload = {
                collectionName: formData.collectionName,
                serialNo: parseInt(formData.serialNo) || 0,
                serialDisplay: formData.serialDisplay,
                tokenType: "COLLECTION",
                tokenTypeDisplayName: formData.tokenTypeDisplayName,
                ownerUsername: formData.ownerUsername,
                rarity: formData.rarity,
                rarityDisplayName: formData.rarityDisplayName,
                imageUrl: formData.imageUrl,
                isOnSale: formData.isOnSale
            };

            await axiosInstance.post('/admin/nft/collections', payload);
            toast.success("NFT가 성공적으로 발급되었습니다!");
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("NFT 발급 실패:", error);
            toast.error("NFT 발급에 실패했습니다.");
        }
    };

    return (
        <Popup onClose={onClose} title="NFT 발급" width="600px">
            <div className="nft-form">
                <div className="form-group">
                    <label>컬렉션명 *</label>
                    <input
                        type="text"
                        name="collectionName"
                        value={formData.collectionName}
                        onChange={handleChange}
                        placeholder="컬렉션명을 입력하세요"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>시리얼 번호</label>
                        <input
                            type="number"
                            name="serialNo"
                            value={formData.serialNo}
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                    <div className="form-group">
                        <label>시리얼 표시명</label>
                        <input
                            type="text"
                            name="serialDisplay"
                            value={formData.serialDisplay}
                            onChange={handleChange}
                            placeholder="예: #001"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>토큰 타입 표시명</label>
                    <input
                        type="text"
                        name="tokenTypeDisplayName"
                        value={formData.tokenTypeDisplayName}
                        onChange={handleChange}
                        placeholder="예: 컬렉션 NFT"
                    />
                </div>

                <div className="form-group">
                    <label>소유자 ID *</label>
                    <input
                        type="text"
                        name="ownerUsername"
                        value={formData.ownerUsername}
                        onChange={handleChange}
                        placeholder="소유자 유저명 입력"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>희귀도</label>
                        <select
                            name="rarity"
                            value={formData.rarity}
                            onChange={handleChange}
                        >
                            <option value="COMMON">COMMON</option>
                            <option value="RARE">RARE</option>
                            <option value="EPIC">EPIC</option>
                            <option value="LEGENDARY">LEGENDARY</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>희귀도 표시명</label>
                        <input
                            type="text"
                            name="rarityDisplayName"
                            value={formData.rarityDisplayName}
                            onChange={handleChange}
                            placeholder="예: 일반"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>이미지 URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="이미지 URL을 입력하세요"
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isOnSale"
                            checked={formData.isOnSale}
                            onChange={handleChange}
                        />
                        판매 중
                    </label>
                </div>

                <div className="form-actions">
                    <button className="btn-cancel" onClick={onClose}>취소</button>
                    <button className="btn-submit" onClick={handleSubmit}>발급하기</button>
                </div>
            </div>
        </Popup>
    );
};

export default AdminFTCollections;
