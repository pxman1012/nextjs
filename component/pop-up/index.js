// components/WelcomePopup.js
import React from 'react';

const WelcomePopup = ({ onClose }) => {
    return (
        <div style={popupStyle}>
            <div style={popupContentStyle}>
                <h2>Xin chào!</h2>
                <p>Chào mừng bạn đến với trang web của chúng tôi!</p>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

// Styles cho popup
const popupStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
};

const popupContentStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
};

export default WelcomePopup;
