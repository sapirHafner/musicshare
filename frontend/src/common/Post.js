import React from 'react'
import Song from './Song';

const Post = ({title, content, musicalObject, user}) => {
  let musicalObjectComponent;
  switch (musicalObject.Type) {
    case "song":
      musicalObjectComponent = <Song id={musicalObject.Id}
            name={musicalObject.Name}
      />
      break
    default:
      <p>invalid</p>
  }
  return (
    <div>
        <br />
        {musicalObjectComponent}
        <h5>{title}</h5>
        <p>{content}</p>
        <br />
        ___________ <br />
        |{user.FirstName} {user.LastName} | <br / >
        ___________ <br />

    </div>
  )
}

export default Post