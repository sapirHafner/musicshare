import React from 'react'
import { useState } from 'react'

import Button from './Buttons/Button'

const Display = ({ components }) => {
    const keys = Object.keys(components)
    const [selectedComponent, setSelectedComponent] = useState(keys[0])

    return (
        <div className='display'>
            <div className='display-buttons'>
                {
                    keys.map(key =>
                        <Button text={key}
                                selected={selectedComponent === key}
                                onClick={() => setSelectedComponent(key)}

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