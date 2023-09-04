import React from 'react';
import LogsDisplay from './LogsDisplay';
import { useState } from 'react';
import Button from '../Common/Button';

const AdminDisplay = () => {
    const [ selectedCategory, setSelectedCategory ] = useState("Logs")
    const categoryComponents = {
        "Logs": <LogsDisplay />,
        "Users": <></>,
        "Features": <></>
    }

    return (
      <div className='adminhomedisplay'>
        <div className='displaybuttons'>
            <Button text="Logs" selected={selectedCategory === "Logs"} onClick={() => {setSelectedCategory("Logs")}}/>
            <Button text="Users" selected={selectedCategory === "Users"} onClick={() => {setSelectedCategory("Users")}}/>
            <Button text="Features" selected={selectedCategory === "Features"} onClick={() => {setSelectedCategory("Features")}}/>
        </div>
        <div>
          {categoryComponents[selectedCategory]}
        </div>
      </div>
    )
}

export default AdminDisplay