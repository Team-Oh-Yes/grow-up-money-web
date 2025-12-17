import './PasswordStrength.css';

// 비밀번호 강도 계산 함수
export const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    
    // 길이 체크
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // 소문자 포함
    if (/[a-z]/.test(password)) strength += 1;
    
    // 대문자 포함
    if (/[A-Z]/.test(password)) strength += 1;
    
    // 숫자 포함
    if (/[0-9]/.test(password)) strength += 1;
    
    // 특수문자 포함
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    if (strength <= 2) {
        return { level: 1, text: '약함', color: '#ff4d4d' };
    } else if (strength <= 4) {
        return { level: 2, text: '보통', color: '#ffaa00' };
    } else {
        return { level: 3, text: '좋음', color: '#00c853' };
    }
};

// PasswordStrength 컴포넌트
export default function PasswordStrength({ password, showHint = true }) {
    const strength = getPasswordStrength(password);
    
    if (!password) return null;
    
    return (
        <div className="password-strength-container">
            <div className="password-strength">
                <div className="password-strength-bars">
                    <div 
                        className={`strength-bar ${strength.level >= 1 ? 'active' : ''}`} 
                        style={{ backgroundColor: strength.level >= 1 ? strength.color : '#e0e0e0' }}
                    />
                    <div 
                        className={`strength-bar ${strength.level >= 2 ? 'active' : ''}`} 
                        style={{ backgroundColor: strength.level >= 2 ? strength.color : '#e0e0e0' }}
                    />
                    <div 
                        className={`strength-bar ${strength.level >= 3 ? 'active' : ''}`} 
                        style={{ backgroundColor: strength.level >= 3 ? strength.color : '#e0e0e0' }}
                    />
                </div>
                <span className="password-strength-text" style={{ color: strength.color }}>
                    {strength.text}
                </span>
            </div>
            {showHint && strength.level === 1 && (
                <div className="password-hint">
                    대문자, 숫자, 특수문자를 포함하면 더 안전합니다.
                </div>
            )}
        </div>
    );
}
