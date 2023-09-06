import React, { useEffect, useState } from 'react'
import { fetchArtistFollowers } from '../ServerFunctions/followersFunctions'
import { useCookies } from 'react-cookie';
import { fetchUsersProfileBoxes } from '../ServerFunctions/ProfilesFunctions';
import LoadingScreen from '../Common/LoadingScreen';

const FollowersDisplay = () => {
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

export default FollowersDisplay