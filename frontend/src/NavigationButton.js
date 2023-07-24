import React from 'react'

const NavigationButton = ({ title, onClick }) => {
  return (
    <div onClick = { onClick }>
      { title }
    </div>
  )
}

export default NavigationButton

