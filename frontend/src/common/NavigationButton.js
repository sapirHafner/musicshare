import React from 'react'

const NavigationButton = ({ title, onClick, isSelected }) => {
  return (
      <div key = { title } onClick = { onClick } className = "navitem" id = {isSelected ? "selectnavitem" : ""} >
        {title}
      </div>
  );
};

export default NavigationButton;