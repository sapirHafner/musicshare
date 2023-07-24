import NavigationButton from "./NavigationButton";

function NavigationBar({ navigationItems }){
    const NavigationButtons = navigationItems.map( navigationItem =>
        <NavigationButton title = { navigationItem.title } onClick = { navigationItem.onClick } />
    )
    return (
        <nav>
            { NavigationButtons }
        </nav>
    )
}

export default NavigationBar;