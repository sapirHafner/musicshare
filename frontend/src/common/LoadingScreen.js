import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='loadingContainer'>
      <div className='loadingSubContainer'>
        <div className="animation">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>    
        </div>
        
        <div> Loading...</div>
      </div>
    </div>
  )
}

export default LoadingScreen