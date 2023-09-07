import React from 'react'
import deleteIcon from '../../Assets/Icons/delete-icon.png'

const DeleteButton = ({onDelete}) => {
  return (
    <span>
        <img className='icon' src={deleteIcon} onClick={onDelete} />
    </span>
  )
}

export default DeleteButton