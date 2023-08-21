import NavigationButton from "./NavigationButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ navigationItems, selectedItem }) => {
    const navigate = useNavigate();

    const onClick = (route) => {
        navigate(route);
    };

    const NavigationButtons = navigationItems.map( navigationItem  =>
        <NavigationButton
            key = { navigationItem.title }
            title = { navigationItem.title }
            onClick = { () => { onClick(navigationItem.route)}}
            isSelected = { navigationItem.title === selectedItem }
        />
    );
    return (
        <nav>
            { NavigationButtons }
        </nav>
    );
};

export default NavigationBar;