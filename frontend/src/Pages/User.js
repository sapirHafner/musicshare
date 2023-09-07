import React from "react";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "../Common/ServerFunctions/ProfilesFunctions";
import { enrichPosts, fetchUserPosts} from "../Common/ServerFunctions/PostsFunctions";
import { useParams } from "react-router-dom";
import Error from "../Components/Error";
import LoadingScreen from "../Components/LoadingScreen";
import UserNavigationBar from "../Components/UserNavigationBar";
import PostsList from "../Components/Lists/PostsList";
import UserProfile from "../Components/UserProfile";
import { useCookies } from "react-cookie";
import TopBar from "../Components/TopBar";

const User = () => {
  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  const [cookies] = useCookies(["userId"]);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      setProfile(await fetchUserProfile(id));
      const userPosts = await fetchUserPosts(id);
      setUserPosts(await enrichPosts(userPosts, userId));
      setIsLoaded(true);
    };

    if (id === undefined) {
      return <Error />;
    }
    fetchData();
  }, []);

  return (
    <div className="grid-container">
      <TopBar />
      <div className="sidebar">
        <UserNavigationBar selectedItem={id === userId ? "Profile" : ""} />
      </div>
      <div className="main">
        <div>
          {isLoaded ? (
            <>
            <div className="content">
              <UserProfile profile={profile} />
            </div>
              <PostsList posts={userPosts} />
            </>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
