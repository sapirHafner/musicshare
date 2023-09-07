import React, { useEffect, useState } from 'react'
import { fetchArtistFollowers } from '../../Common/ServerFunctions/followersFunctions'
import { useCookies } from 'react-cookie';
import { fetchUsersProfileBoxes } from '../../Common/ServerFunctions/ProfilesFunctions';
import LoadingScreen from '../Common/LoadingScreen';

const FollowersList = () => {
    const [followers, setFollowers] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [cookies] = useCookies(['userId']);
    const { userId, artistId } = cookies

    useEffect(() => {
        const fetchData = async () => {
          setFollowers(await fetchUsersProfileBoxes(await fetchArtistFollowers(artistId), userId));
          setIsLoaded(true);
        };
        fetchData();
    }, [])

  return (
      isLoaded ?
      (<>
      {followers.length} followers
      {followers.map(follower =>
        <div>
          {follower.FirstName} {follower.LastName}
        </div>)}
        </>)
    : <LoadingScreen />
  )
}

export default FollowersList