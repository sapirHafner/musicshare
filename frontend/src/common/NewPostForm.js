import React from 'react'

const NewPostForm = ({onSubmit}) => {
  const handleSumbit = (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const content = event.target.content.value;
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

        <input type='submit' value='Create new post'/>
    </form>
  )
}

export default NewPostForm