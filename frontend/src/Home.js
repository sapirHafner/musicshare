import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import SongsDisplay from './SongsDisplay';
import axios from "axios";

function Home() {
    const [ navOptionSelected, setNavOptionSelected ] = useState("Home");
    const [ songs, setSongs ] = useState([])

    const homeNavItem = {
        title: "Home",
        onClick: () => {
            setNavOptionSelected("Home");
        },
    }
    const songsNavItem = {
        title: "Songs",
        onClick: () => {
            setNavOptionSelected("Songs")
        },
    }

    const navigationItems1 = [homeNavItem, songsNavItem]

    const songsServerUrl = "http://localhost:4000/songs";
    useEffect(() => {
        const fetchSongs = async () => {
            const response = await axios.get(songsServerUrl);
            setSongs(response.data);
        }
        fetchSongs();
    }, [])

    let selectedItem;
    if (navOptionSelected === "Home")
    {
        selectedItem = <h2> You are at home! </h2>
    } else if (navOptionSelected === "Songs")
    {
        selectedItem = <SongsDisplay songItems={songs}/>
    }

    return (
        <div>
            <h1>Welcome to MusicShare!</h1>
            <NavigationBar navigationItems = {navigationItems1} />
            {
                selectedItem
            }
        </div>
    );
}

export default Home;



