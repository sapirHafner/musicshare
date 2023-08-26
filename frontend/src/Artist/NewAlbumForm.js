import React, { useState } from 'react';

const NewAlbumForm = ({ onSubmit }) => {
    const [songs, setSongs] = useState([{ Name: "" }]);

    const removeSongInput = index => {
        setSongs(songs.filter((song, i) => i !== index));
    };

    const handleSongNameChange = (index, value) => {
        const updatedSongs = songs.map((song, i) => (i === index ? { ...song, Name: value } : song));
        setSongs(updatedSongs);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({
            Name: event.target.name.value,
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
                            placeholder={song.Name}
                            value={song.Name}
                            onChange={event => handleSongNameChange(index, event.target.value)}
                        />
                        <span onClick={() => removeSongInput(index)}>(-)</span>
                    </div>
                )
            }
            <div onClick={() => setSongs([...songs, { Name: "" }])}>(+)</div>
            <input type='submit' value='Create Album' />
            <br/>
        </form>
    );
};

export default NewAlbumForm;
