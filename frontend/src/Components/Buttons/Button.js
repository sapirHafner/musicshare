import React from 'react'

const Button = ({ id, text, selected, onClick }) => {
  return (
    <span id={id} onClick={onClick} className={`button rounded ${selected ? "selected" : ""}`}>
        {text}
    </span>
  );
}

export default Button;