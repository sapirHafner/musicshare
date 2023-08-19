import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import SongsDisplay from './SongsDisplay';
import FriendsDisplay from "./FriendsDisplay";
import Profile from "./Profile";
import { fetchSongs, fetchUserProfile, fetchFriends } from "./serverFunctions";
import { useCookies } from "react-cookie";

const Home = () => {
    const [navOptionSelected, setNavOptionSelected] = useState("Home");
    const [songs, setSongs] = useState([]);
    const [profile, setProfile] = useState({});
    const [friends, setFriends] = useState([]);

    const [isSongsLoaded, setIsSongsLoaded] = useState(false);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
    const [isFriendsLoaded, setIsFriendsLoaded] = useState(false);

    const [cookies] = useCookies(['userId']);

    const homeNavItem = {
        title: "Home"
    };
    const songsNavItem = {
        title: "Songs"
    };
    const profileNavItem = {
        title: "Profile"
    };

    const friendsNavItem = {
        title: "Friends"
    };

    const navigationItems = [homeNavItem, songsNavItem, profileNavItem, friendsNavItem];

    useEffect(() => {
        if (navOptionSelected === "Songs") {
            if (!isSongsLoaded) {
                const songs = fetchSongs();
                setSongs(songs);
                setIsSongsLoaded(true);
            }
        } else if (navOptionSelected === "Friends") {
            if (!isFriendsLoaded) {
                const friendsProfiles = fetchFriends(cookies['userId']);
                setFriends(friendsProfiles);
                setIsFriendsLoaded(true);
            }
        }

        if (!isProfileLoaded){
            const profile = fetchUserProfile(cookies['userId']);
            setProfile(profile);
            setIsProfileLoaded(true);
        }
    }, [navOptionSelected]);

    const onChange = (title) => {
        setNavOptionSelected(title);
    };

    let selectedItem;
    if (navOptionSelected === "Home"){
        selectedItem = <h2> You are at home! </h2>;
    } else if (navOptionSelected === "Songs"){
        selectedItem = isSongsLoaded ? <SongsDisplay songItems={ songs }/> : <p> loading... </p>;
    } else if (navOptionSelected === "Profile"){
        selectedItem = isProfileLoaded ? <Profile profile = { profile } /> : <p> loading... </p>;
    } else if (navOptionSelected === "Friends"){
        selectedItem = isFriendsLoaded ? <FriendsDisplay friends={friends}/> : <p> loading... </p>
    }

    return (
        <div>
            <h1>Welcome to MusicShare!</h1>
            <h3> {profile.FirstName} {profile.LastName}</h3>
            <NavigationBar navigationItems = { navigationItems } defualtItem = "Home" onChange = { onChange } />
            {
                selectedItem
            }
        </div>
    );
};

export default Home;