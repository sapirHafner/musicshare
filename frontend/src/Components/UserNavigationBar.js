import React from 'react'
import NavigationBar from './NavigationBar';
import { useCookies } from 'react-cookie';

const UserNavigationBar = ({ selectedItem }) => {
    const [cookies] = useCookies(['userId']);
    const { userId } = cookies;

    const homeNavItem = {
        key: "home",
        title: "Home",
        route: "/home"
    };
    const browseNavItem = {
        key: "browse",
        title: "Browse",
        route: "/browse"
    };
    const LibraryNavItem = {
        key: "library",
        title: "Library",
        route: `/library/${userId}`
    };

    const allUsersNavItem = {
        key: "allUsers",
        title: "All Users",
        route: "/allUsers"
    };

    const friendsRequestsNavItem = {
        key: "friendsRequests",
        title: "Friends Requests",
        route: "/friendsRequests"
    };

    const navigationItems = [
        homeNavItem,
        browseNavItem,
        LibraryNavItem,
        allUsersNavItem,
        friendsRequestsNavItem
        ];

    return (
    <div className='sidebar'>
        <NavigationBar
            navigationItems={navigationItems}
            selectedItem={selectedItem}
        />
    </div>
    )
}

export default UserNavigationBar