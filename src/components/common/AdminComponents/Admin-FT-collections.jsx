import { useState } from 'react';
import '../../css/Admincss/Admin-FT-collections.css';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import Popup from './Popup';

const AdminFTCollections = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        themeId: 0,
        name: "",
        rarity: "COMMON",
        image2dUrl: "",
        image3dUrl: "",
        maxSupply: 1,
        description: ""
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async () => {
        // 필수 필드 검증
        if (!formData.name || !formData.themeId) {
            toast.error("컬렉션명과 테마 ID는 필수입니다.");
            toast.clearWaitingQueue();
            return;
        }

        try {
            const payload = {
                themeId: formData.themeId,
                name: formData.name,
                rarity: formData.rarity,
                image2dUrl: formData.image2dUrl,
                image3dUrl: formData.image3dUrl,
                maxSupply: formData.maxSupply,
                description: formData.description
            };

            await axiosInstance.post('/admin/nft/collections', payload);
            toast.success("컬렉션이 성공적으로 생성되었습니다!");
            toast.clearWaitingQueue();
            if (onSuccess) onSuccess();
            onClose();

        } catch (error) {
            console.error("컬렉션 생성 실패:", error);
            toast.error("컬렉션 생성에 실패했습니다.");
            toast.clearWaitingQueue();
        }
    };

    return (
        <Popup onClose={onClose} title="NFT 컬렉션 생성" width="600px">
            <div className="nft-form">
                <div className="form-group">
                    <label>테마 ID *</label>
                    <input
                        type="number"
                        name="themeId"
                        value={formData.themeId}
                        onChange={handleChange}
                        placeholder="테마 ID를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label>컬렉션명 *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="컬렉션명을 입력하세요"
                    />
                </div>

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
                    <label>2D 이미지 URL</label>
                    <input
                        type="text"
                        name="image2dUrl"
                        value={formData.image2dUrl}
                        onChange={handleChange}
                        placeholder="2D 이미지 URL을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label>3D 이미지 URL</label>
                    <input
                        type="text"
                        name="image3dUrl"
                        value={formData.image3dUrl}
                        onChange={handleChange}
                        placeholder="3D 이미지 URL을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label>최대 공급량</label>
                    <input
                        type="number"
                        name="maxSupply"
                        value={formData.maxSupply}
                        onChange={handleChange}
                        placeholder="최대 공급량"
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label>설명</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="컬렉션 설명을 입력하세요"
                        rows="4"
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-cancel" onClick={onClose}>취소</button>
                    <button className="btn-submit" onClick={handleSubmit}>생성하기</button>
                </div>
            </div>
        </Popup>
    );
};

export default AdminFTCollections;