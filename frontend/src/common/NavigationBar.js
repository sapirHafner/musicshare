import NavigationButton from "./NavigationButton";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ navigationItems, selectedItem, onLogout }) => {
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
        <nav className="navbar">
            <ul className="navbar-nav">
                { NavigationButtons }
                <li className='nav-item rounded p-3 m-1' onClick={onLogout}>logout</li>
            </ul>
        </nav>
    );
};

export default NavigationBar;