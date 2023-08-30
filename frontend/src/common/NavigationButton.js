import React from 'react'

const NavigationButton = ({ title, onClick, isSelected }) => {
  return (
      <li key = { title } onClick = { onClick } className = "nav-item rounded p-3 m-1" id = {isSelected ? "selectnavitem" : ""} >
        {title}
      </li>
  );
};

export default NavigationButton;