import React from 'react';

interface DifficultyPopupProps {
  onSelectDifficulty: (mode: string) => void;
}

const DifficultyPopup: React.FC<DifficultyPopupProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Select Difficulty</h2>
        <button onClick={() => onSelectDifficulty('easy')}>Easy Mode (2 Cards)</button>
        <button onClick={() => onSelectDifficulty('hard')}>Hard Mode (3 Cards)</button>
      </div>
    </div>
  );
};

export default DifficultyPopup;
