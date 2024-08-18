import React from 'react';

interface StartPopupProps {
  onStart: () => void;
  showBackButton?: boolean; 
  onBackToHome?: () => void; 
}

const StartPopup: React.FC<StartPopupProps> = ({ onStart, showBackButton = false, onBackToHome }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Welcome to the Character Memory Game!</h2>
        <button onClick={onStart}>Play</button>
        {showBackButton && onBackToHome && (
          <button onClick={onBackToHome}>Back to Home</button>
        )}
      </div>
    </div>
  );
};

export default StartPopup;
