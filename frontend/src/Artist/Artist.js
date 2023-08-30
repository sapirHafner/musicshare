import React, { useEffect, useState } from 'react'
import Upperbar from '../User/Upperbar'
import UserNavigationBar from '../User/UserNavigationBar'
import { useParams } from 'react-router-dom'
import { fetchArtist } from '../ServerFunctions/ArtistFunctions'
import LoadingScreen from '../Common/LoadingScreen'
import { fetchAlbums } from '../ServerFunctions/AlbumFunctions'
import AlbumBox from '../Common/AlbumBox'
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useNavigate
 } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { addUserLike, fetchUserLikes, removeUserLike } from '../ServerFunctions/likesFunctions'
import { setEntitiesLikes } from '../Common/Utilities'

const Artist = () => {
  const { id } = useParams();
  const [ artist, setArtist ] = useState();
  const [ albums, setAlbums ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userLikes = await fetchUserLikes(userId);
      const fetchedArtist = setEntitiesLikes([await fetchArtist(id)], userLikes)[0];
      setArtist(fetchedArtist);
      setAlbums(await fetchAlbums(fetchedArtist.AlbumsIds));
      setIsLiked(fetchedArtist.liked)
      setLoaded(true)
    };
    fetchData()
  }, [])

    const handleLike = (event) => {
      const onLike = async () => {
        event.preventDefault();
        await addUserLike(userId, {
          Type: "artist",
          Id: artist._id,
        });
        setIsLiked(true);
      };
      onLike();
  }

  const handleDislike = (event) => {
    const onDisike = async () => {
      event.preventDefault();
      await removeUserLike(userId, {
        Type: "artist",
        Id: artist._id,
      });
      setIsLiked(false);
    };
    onDisike();
  }

  return (
    <div className='grid-container'>
    <Upperbar />
    <div className='sidebar'>
        <UserNavigationBar />
    </div>
    <div className='main'>
        {
          loaded
          ?
            <>
              <div className='content artistheader'>
                <div>
                  <div className='albumName'>artist</div>
                  <div>{artist.Name}</div>
                </div>
                <div>
                  {isLiked ?
                      <span className='clickable' onClick={handleDislike}><img class='icon' src={thumbsDownIcon}/></span>
                    : <span className='clickable' onClick={handleLike}><img class='icon' src={thumbsUpIcon}/></span>
                  }
                  <span className='clickable' onClick={()=>{navigate(`/newpost?type=artist&id=${artist._id}`)}}><img class='icon' src={shareIcon}/></span>
                </div>
              </div>
              <div className='content albums'>
                {albums.map(album => <AlbumBox album={album} className="min"/>)}
              </div>
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default Artist;