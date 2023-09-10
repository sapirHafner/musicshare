import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Display from '../Components/Display';
import UserPage from '../Components/UserPage';
import MusicDisplay from '../Components/MusicDisplay';
import ProfilesList from '../Components/Lists/ProfilesList';

import { getTypeIds } from '../Common/Utilities';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchUserLikes } from '../Common/ServerFunctions/likesFunctions';
import { addUserLike, removeUserLike } from '../Common/ServerFunctions/likesFunctions'
import { addFollower, fetchUserFollows, removeFollower } from '../Common/ServerFunctions/followersFunctions';
import { fetchUserProfileBox } from '../Common/ServerFunctions/ProfilesFunctions';
import ProfileBox from '../Components/Boxes/ProfileBox';
import { enrichPosts, fetchUserPosts } from '../Common/ServerFunctions/PostsFunctions';
import { addFriendRequest, removeFriendRequest } from '../Common/ServerFunctions/FriendsRequestsFunctions';
import { addFriendshipBetweenUsers } from '../Common/ServerFunctions/FriendsFunctions';
import { fetchFriends } from '../Common/ServerFunctions/FriendsFunctions';
import PostsList from '../Components/Lists/PostsList'
import ArtistsList from '../Components/Lists/ArtistsList';

const Library = () => {
    const [profile, setProfile] = useState()
    const [likedArtists, setLikedArtists] = useState();
    const [likedAlbums, setLikedAlbums] = useState();
    const [likedSongs, setLikedSongs] = useState();
    const [userPosts, setUserPosts] = useState();
    const [userFollows, setUserFollows] = useState([]);
    const [userFriends, setUserFriends] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();
    const [ cookies ] = useCookies()
    const { userId } = cookies
    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        setProfile(await fetchUserProfileBox(id, userId));
        const userLikes = await fetchUserLikes(id)
        const likedArtistsIds = getTypeIds(userLikes, "artist");
        const likedAlbumsIds = getTypeIds(userLikes, "album");
        const likedSongsIds = getTypeIds(userLikes, "song");
        const [artists, albums, songs] = await fetchFullDetails(userId, likedArtistsIds, likedAlbumsIds, likedSongsIds);
        setUserPosts(await enrichPosts(await fetchUserPosts(id)));
        setLikedArtists(artists);
        setLikedAlbums(albums);
        setLikedSongs(songs);
        const [followedArtists] = await fetchFullDetails(userId, (await fetchUserFollows(id)).map(_ => _.artistId));
        setUserFollows(followedArtists);
        setUserFriends(await fetchFriends(userId));
        setIsLoaded(true);
      }
      fetchData();
    }, [id])

    return (
      <UserPage selectedNavItem={userId === id ? "library" : ""} isLoaded={isLoaded} component=
      <div>
        <div className='content'>
          <ProfileBox profile={profile}
                      sendFriendRequest={(id) => addFriendRequest(userId, id)}
                      removeFriendRequest={(id) => removeFriendRequest(userId, id)}
                      acceptFriendRequest={(id) => {
                        addFriendshipBetweenUsers(id, userId)
                        removeFriendRequest(id, userId)
                        }}
                      declineFriendRequest={(id) => removeFriendRequest(userId, id)}
                      other={id != userId}

          />
        </div>
        <Display components={{
                "Library": <MusicDisplay artists={likedArtists}
                      albums={likedAlbums}
                      songs={likedSongs}
                      onLike={(musicalEntity) => addUserLike(userId, musicalEntity)}
                      onDislike={(musicalEntity) => removeUserLike(userId, musicalEntity)}
                      onFollow={(artistId) => addFollower(artistId, userId)}
                      onUnollow={(artistId) => removeFollower(artistId, userId)}
                      onShare={(type, id) => navigate(`/newpost?type=${type}&id=${id}`)} />,
                "Posts": <PostsList posts={userPosts} />,
                "Follows": <ArtistsList artists={userFollows}
                                        onLike={(musicalEntity) => addUserLike(userId, musicalEntity)}
                                        onDislike={(musicalEntity) => removeUserLike(userId, musicalEntity)}
                                        onFollow={(artistId) => addFollower(artistId, userId)}
                                        onUnollow={(artistId) => removeFollower(artistId, userId)}
                                        onShare={(id) => navigate(`/newpost?type=artist&id=${id}`)} />,
                  "Friends":  <ProfilesList profiles={userFriends}/>,
        }}
      />
      </div>
      />
    )
}

export default Library;

