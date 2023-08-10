import NavigationButton from "./NavigationButton";
import { useState } from "react";

const NavigationBar = ({ navigationItems, defualtItem, onChange }) => {
    const [ optionSelected, setOptionSelected ] = useState(defualtItem);

    const onClick = (title) => {
        setOptionSelected(title);
        onChange(title);
    };

    const NavigationButtons = navigationItems.map( navigationItem  =>
        <NavigationButton
            key = { navigationItem.title }
            title = { navigationItem.title }
            onClick = { () => { onClick(navigationItem.title)}}
            isSelected = { navigationItem.title === optionSelected }
        />
    );
    return (
        <nav>
            { NavigationButtons }
        </nav>
    );
};

export default NavigationBar;