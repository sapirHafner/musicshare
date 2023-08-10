import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import SongsDisplay from './SongsDisplay';
import FriendsDisplay from "./FriendsDisplay";
import Profile from "./Profile";
import axios from "axios";
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

    const baseServerUrl = "http://localhost:4000"
    const songsServerUrl = `${baseServerUrl}/songs`;
    const profilesServerUrl = `${baseServerUrl}/profiles`;
    const friendServerUrl = `${baseServerUrl}/friends`;

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

    const fetchSongs = async () => {
        const response = await axios.get(songsServerUrl);
        setSongs(response.data);
        setIsSongsLoaded(true);
    };

    const fetchProfile = async () => {
        const response = await axios.get(profilesServerUrl + "/" + cookies["userId"]);
        setProfile(response.data);
        setIsProfileLoaded(true);
    };

    const fetchFriends = async () => {
        const response = await axios.get(friendServerUrl + "/" + cookies["userId"]);
        const friendsIds = response.data;
        const friendsProfiles = await Promise.all(friendsIds.map(async (friendId) => {
            const response = await axios.get(profilesServerUrl + "/" + friendId);
            return response.data;
        }));
        setFriends(friendsProfiles);
        setIsFriendsLoaded(true);
    };

    useEffect(() => {
        if (navOptionSelected === "Songs") {
            if (!isSongsLoaded) {
                fetchSongs();
            }
        } else if (navOptionSelected === "Friends") {
            if (!isFriendsLoaded) {
                fetchFriends();
            }
        }

        if (!isProfileLoaded){
            fetchProfile();
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