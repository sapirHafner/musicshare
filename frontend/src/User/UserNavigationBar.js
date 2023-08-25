import React from 'react'
import NavigationBar from '../NavigationBar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserNavigationBar = ({selectedItem}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const userId = cookies['userId']

    const navigate = useNavigate()

    const homeNavItem = {
        title: "Home",
        route: "/home"
    };
    const browseNavItem = {
        title: "Browse",
        route: "/browse"
    };
    const LibraryNavItem = {
        title: "Library",
        route: `/library`
    };
    const profileNavItem = {
        title: "Profile",
        route: "/profile"
    };

    const friendsNavItem = {
        title: "Friends",
        route: "/friends"
    };

    const logOut = () => {
        removeCookie('userId')
        navigate("/")
    }

    const navigationItems = [
        homeNavItem,
        browseNavItem,
        LibraryNavItem,
        profileNavItem,
        friendsNavItem,
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

export default UserNavigationBar