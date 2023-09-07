import React from 'react'

const NavigationButton = ({ title, onClick, isSelected }) => {
  return (
      <li key = { title } onClick = { onClick } className = {`button rounded p-3 m-1 ${isSelected ? "selected" : ""}`} >
        {title}
      </li>
  );
};

export default NavigationButton;