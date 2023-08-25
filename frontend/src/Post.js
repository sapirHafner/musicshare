import React from 'react'

const Post = ({title, content, musicalObject, user}) => {
  return (
    <div>
        Title: {title} <br />
        Content: {content} <br />
        <br />
        <br />
    </div>
  )
}

export default Post