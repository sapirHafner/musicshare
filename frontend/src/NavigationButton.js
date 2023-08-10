import React from 'react'

const NavigationButton = ({ title, onClick, isSelected }) => {
  return (
      <div key = { title } onClick = { onClick }>
        {isSelected ? `### ${title} ###` : title}
      </div>
  );
};

export default NavigationButton;