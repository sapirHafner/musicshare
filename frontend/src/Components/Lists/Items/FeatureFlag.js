import React, { useState } from 'react'
import Button from '../../Buttons/Button'
import deleteIcon from '../../../Assets/Icons/delete-icon.png'

const FeatureFlag = ({ featureFlag, onUpdate, onDelete }) => {
    const [isActive, setIsActive] = useState(featureFlag.active)

    const handleActivate = () => {
        try {
            setIsActive(true)
            onUpdate(featureFlag.name, true);
        } catch (error) {
            setIsActive(false)
        }
      }

    const handleDisctivate = () => {
        try {
            setIsActive(false)
            onUpdate(featureFlag.name, false);
        } catch (error) {
            setIsActive(true)
        }
      }
  return (
    <div>
        <span style={{color: isActive ? "green" : "grey"}}>
        {featureFlag.name}
        </span>
        {isActive ?
            <Button text={"deactivate"} onClick={handleDisctivate}/>
        : <Button text={"activate"}  onClick={handleActivate}/>
        }
        <img className="icon" src={deleteIcon} onClick={() => onDelete(featureFlag.name)} />
    </div>
  )
}

export default FeatureFlag