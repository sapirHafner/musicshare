import React from 'react'

const Post = ({title, content, musicalObject, user}) => {
  return (
    <div>
        <br />
        ______________________________ <br />
        |{musicalObject.name} | {musicalObject.album} | {musicalObject.artist} <br/>
        ______________________________ <br />
        <h5>{title}</h5>
        <p>{content}</p>
        <br />
        <br />
    </div>
  )
}

export default Post