import React from "react";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "../Common/ServerFunctions/ProfilesFunctions";
import { enrichPosts, fetchUserPosts} from "../Common/ServerFunctions/PostsFunctions";
import { useParams } from "react-router-dom";
import Error from "../Components/Error";
import PostsList from "../Components/Lists/PostsList";
import ProfileBox from "../Components/Boxes/ProfileBox";
import { useCookies } from "react-cookie";
import UserPage from "../Components/UserPage";
import Link from "../Components/Link";
import { getFeatureFlag } from "../Common/ServerFunctions/featureFlagsFunctions";
import Display from "../Components/Display";

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
          <div>
            <div className="content">
              <ProfileBox profile={profile} />
            </div>
            <Display components={{
              "Posts": <PostsList posts={userPosts} />,
              "Library": <></>

            }}/>
          </div>
    }
    />
  )
}
export default User;