import React, { useState } from 'react';
import Button from './Buttons/Button';

const InputButton = ({ text, onEnter }) => {
  const [isButtonPushed, setIsButtonPushed] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setIsButtonPushed(true);
  };

  const handleCancelButtonClick = () => {
    setIsButtonPushed(false);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnter(inputValue);
      setIsButtonPushed(false);
      setInputValue('');
    }
  };

  return (
    <div>
      {isButtonPushed ? (
        <>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            autoFocus
          />
          <Button text="Cancel" onClick={handleCancelButtonClick} />
        </>
      ) : (
        <Button text={text} onClick={handleButtonClick} />
      )}
    </div>
  );
};

export default InputButton;
