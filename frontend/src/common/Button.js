import React from 'react'

const Button = ({ text, selected, onClick }) => {
  return (
    <span onClick={onClick} className={`button rounded ${selected ? "selected" : ""}`}>
        {text}
    </span>
  );
}

export default Button;