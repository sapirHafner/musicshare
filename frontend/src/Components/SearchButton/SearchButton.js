import React, { useState } from 'react';
import searchIcon from './search-icon.png';

const SearchButton = () => {
    const [ isClicked, setIsClicked ] = useState([false]);
    const onClick = () => setIsClicked(!isClicked)
  return (
    <>
      { isClicked ? (
        <div onClick={onClick}>
            <img className='icon clickable' src={searchIcon} alt='Search Icon' />
        </div>
      ) : (
        <div className='functions'>
            <input />
            <div onClick={onClick}>
                X
            </div>
        </div>
      )}
    </>
  );
};

export default SearchButton;