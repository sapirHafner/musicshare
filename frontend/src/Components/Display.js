import React from 'react'
import { useState } from 'react'

import Button from './Buttons/Button'

const Display = ({ components, onChange }) => {
    const keys = Object.keys(components)
    const [selectedComponent, setSelectedComponent] = useState(keys[0])

    const handleClick = (key) => {
        setSelectedComponent(key);
        if (onChange) {
            onChange(key)
        }
    }

    return (
        <div className='display'>
            <div className='display-buttons'>
                {
                    keys.map(key =>
                        <Button text={key}
                                selected={selectedComponent === key}
                                onClick={() => handleClick(key)}
                        />)
                }
            </div>
            <div className='display-component'>
                {components[selectedComponent]}
            </div>
    </div>
  )
}

export default Display