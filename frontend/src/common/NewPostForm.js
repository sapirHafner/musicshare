import React, { useState } from 'react'

const NewPostForm = ({onSubmit}) => {
  const [ errorMessage, setErrorMessage ] = useState("")
  const handleSumbit = (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      if (!title) {
        setErrorMessage("Title cannot be empty")
        return;
      } if (title.length > 40) {
        setErrorMessage("Title cannot be more than 40 characters long")
        return;
      }
      const content = event.target.content.value;
      if (!content) {
        setErrorMessage("Content cannot be empty")
        return;
      }
      if (content.length > 300) {
        setErrorMessage("Content cannot be more than 300 characters long")
        return;
      }
      onSubmit(title, content);

  }
  return (
    <form onSubmit={handleSumbit}>
        <br />
        <label for="title">Title:</label> <br />
        <input name="title" />
        <br />
        <br />
        <br />
        Content:
        <br />
        <textarea name="content"></textarea>
        <br />
        <br />
        <br />
        <p id="errormessage">{errorMessage}</p>
        <input type='submit' value='Create new post'/>
    </form>
  )
}

export default NewPostForm