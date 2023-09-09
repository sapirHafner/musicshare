import React, { useState } from 'react';
import UploadImage from './UploadImage';

const NewAlbumForm = ({ onSubmit, uploadImage }) => {
    const [songs, setSongs] = useState([{ name: "" }]);
    const [imageUrl, setImageUrl] = useState("" );

    const removeSongInput = index => {
        setSongs(songs.filter((song, i) => i !== index));
    };

    const handleSongNameChange = (index, value) => {
        const updatedSongs = songs.map((song, i) => (i === index ? { ...song, name: value } : song));
        setSongs(updatedSongs);
    };

    const onImageChange = (url) => setImageUrl(url);

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({
            name: event.target.name.value,
            imageUrl,
        }, songs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'> Name: </label>
            <input type='text' name='name'/>
            <br />
            <br />
            {
                songs.map((song, index) =>
                    <div key={index}>
                        <input
                            placeholder={song.name}
                            value={song.name}
                            onChange={event => handleSongNameChange(index, event.target.value)}
                        />
                        <span onClick={() => removeSongInput(index)}>(-)</span>
                    </div>
                )
            }
            <div onClick={() => setSongs([...songs, { name: "" }])}>(+)</div>
            {
              uploadImage &&
                <UploadImage onChange={onImageChange}/>
            }
            <input type='submit' value='Create Album' />
            <br/>
        </form>
    );
};

export default NewAlbumForm;
