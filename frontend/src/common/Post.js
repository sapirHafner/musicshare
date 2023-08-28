import React from 'react'
import SongBox from './SongBox';

const Post = ({title, content, musicalEntity, user}) => {
  let musicalEntityComponent;
  switch (musicalEntity.Type) {
    case "song":
      musicalEntityComponent = <SongBox song={musicalEntity.Info}
      />
      break
    default:
      <p>invalid</p>
  }
  return (
    <div>
        <br />
        {musicalEntityComponent}
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