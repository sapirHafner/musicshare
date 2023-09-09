import React from "react";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "../Common/ServerFunctions/ProfilesFunctions";
import { enrichPosts, fetchUserPosts} from "../Common/ServerFunctions/PostsFunctions";
import { useParams } from "react-router-dom";
import Error from "../Components/Error";
import PostsList from "../Components/Lists/PostsList";
import UserProfile from "../Components/UserProfile";
import { useCookies } from "react-cookie";
import UserPage from "../Components/UserPage";
import Link from "../Components/Link";
import { getFeatureFlag } from "../Common/ServerFunctions/featureFlagsFunctions";

const User = () => {
  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  const [cookies] = useCookies(["userId"]);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
    const imagesFeatureFlag = await getFeatureFlag("images");
    const fetchedProfile = await fetchUserProfile(id);
    if (!imagesFeatureFlag) {
      delete fetchedProfile.imageUrl;
    }
    setProfile(fetchedProfile);
    const userPosts = await fetchUserPosts(id);
    setUserPosts(await enrichPosts(userPosts, userId));
    setIsLoaded(true);
    };

    if (id === undefined) {
      return <Error />;
    }
    fetchData();
  }, [id]);

  return (
    <UserPage isLoaded={isLoaded} component={
          <>
            <div className="content">
              <UserProfile profile={profile} />
              <Link text="Library" url={`/library/${id}`}/>
            </div>
            <PostsList posts={userPosts} />
          </>
    }
    />
  )
}
export default User;