import React from 'react'

const Button = ({ text, onClick }) => {
  return (
    <span onClick={onClick}>
        <u>||{text}||</u>
    </span>
  );
}

export default Button;