import React from 'react'
import NavigationBar from '../Common/NavigationBar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserNavigationBar = ({selectedItem}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const { userId } = cookies;
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
        route: `/library/${userId}`
    };
    const profileNavItem = {
        title: "Profile",
        route: `/user/${userId}`
    };

    const friendsNavItem = {
        title: "Friends",
        route: "/friends"
    };

    const friendsApplicatonsNavItem = {
        title: "Friends Applicatons",
        route: "/friendsApplications"
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