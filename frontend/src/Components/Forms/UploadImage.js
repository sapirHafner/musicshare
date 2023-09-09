import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = ({ onChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const checkImageUrl = async (url) => {
    try {
      const response = await axios.head(url);
      if (response.status >= 200 && response.status < 300) {
        const contentType = response.headers['content-type'];
        setIsLoaded(contentType && contentType.startsWith('image/'));
        onChange(url)
      } else {
        setIsLoaded(false);
      }
    } catch (error) {
      setIsLoaded(false);
    }
  };

  return (
    <div>
      <label htmlFor='imageurl'> Image: </label>
      <input
        name='imageurl'
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value)
          checkImageUrl(event.target.value)
        }}
      />
      {imageUrl ?
        isLoaded ? (
        <div>
          preview: <br />
          <img style={{ width: '8rem', height: '8rem' }} src={imageUrl} alt="Preview" />
        </div>
      ) : (
        <p>Invalid image</p>
      )
        : <></>
      }
    </div>
  );
};

export default UploadImage;
