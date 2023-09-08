import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Button from '../Components/Buttons/Button'
import ShareButton from '../Components/Buttons/ShareButton'
import AlbumBox from '../Components/Boxes/AlbumBox'

import { fetchArtist } from '../Common/ServerFunctions/ArtistFunctions'
import { fetchAlbums } from '../Common/ServerFunctions/AlbumFunctions'


const MyMusic = () => {



  return (
    <div className='grid-container'>
    <div className='mymusic main'>
        {
          loaded
          ?
            <>
              <div className='content header'>
                <div>
                  <div className='albumName'>artist</div>
                  <div>{artist.Name}</div>
                </div>
                <div className='functions'>
                  <ShareButton type="artist" id={artist._id} />
                </div>
              </div>
              <Button text="Add new album" onClick={()=>{navigate("/addNewAlbum")}} />
              <div className='mymusic albums'>
                {albums.map(album => <AlbumBox album={album} className={"min"}/>)}
              </div>
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default MyMusic;

//<AlbumBox album={album} className="min"/>