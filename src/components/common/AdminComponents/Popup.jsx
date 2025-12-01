import '../../css/Admincss/Admin-popup.css';

const Popup = ({ children, onClose, title, width = '500px' }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div
                className="popup-container"
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="popup-header">
                    <h2>{title}</h2>
                    <button className="popup-close-btn" onClick={onClose}>X</button>
                </div>
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;
