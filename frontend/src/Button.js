import React from 'react'

const Button = ({ text, onClick }) => {
  return (
    <div onClick={onClick}>
        <u>||{text}||</u>
    </div>
  )
}

export default Button