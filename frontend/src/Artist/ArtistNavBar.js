import React from 'react'
import NavigationBar from '../Common/NavigationBar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ArtistNavBar = ({selectedItem}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);

    const navigate = useNavigate()

    const homeNavItem = {
        title: "Home",
        route: "/home"
    };
    const myMusicNavItem = {
        title: "My Music",
        route: `/myMusic`
    };
    const profileNavItem = {
        title: "Profile",
        route: "/profile"
    };

    const followersNavItem = {
        title: "Followers",
        route: "/followers"
    };

    const logOut = () => {
        removeCookie('userId')
        navigate("/")
    }

    const navigationItems = [
        homeNavItem,
        myMusicNavItem,
        profileNavItem,
        followersNavItem,
        ];
    return (
        <div>
           <NavigationBar navigationItems = { navigationItems } selectedItem = { selectedItem } />
            <div onClick={logOut}>log out</div>
            ________________________________________________________________________
            <br />
            <br />
            <br />
            <br />

        </div>
    )
}

export default ArtistNavBar;