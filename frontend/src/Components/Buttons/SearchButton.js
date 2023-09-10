import React, { useState } from 'react';
import searchIcon from '../../Assets/Icons/search-icon.png';

const SearchButton = ({ onChange }) => {
    const [ isClicked, setIsClicked ] = useState([false]);
    const onClick = () => setIsClicked(!isClicked)
  return (
    <>
        <div className='functions'>
          {isClicked &&  <input onChange={(event) => onChange(event.target.value)}/> }
            <div onClick={onClick}>
                <img className='icon clickable' src={searchIcon} alt='Search Icon' />
            </div>
        </div>
    </>
  );
};

export default SearchButton;
