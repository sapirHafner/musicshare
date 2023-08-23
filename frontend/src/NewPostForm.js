import React from 'react'

const NewPostForm = ({onSubmit}) => {
  const handleSumbit = (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const content = event.target.content.value;
      const objectType = event.target.objectType.value;
      onSubmit(title, content, objectType);
  }
  return (
    <form onSubmit={handleSumbit}>
        <label for="objectType">Choose a type:</label>
        <select id="objectType" name="objectType">
            <option value="song">Song</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
        </select>
        <input type="search" id="typeSearch" name="typeSearch" />
        <br />
        <label for="title">Title:</label>
        <input name="title" />
        <br />
        your post:
        <textarea name="content"></textarea>
        <br />
        <br />
        <br />

        <input type='submit' value='Create new post'/>
    </form>
  )
}

export default NewPostForm