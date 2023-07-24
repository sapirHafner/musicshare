import { useState } from 'react';
import Home from './Home';
import LoginPage from './LoginPage';

function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin(username, password, rememberMe){
        //check if username and password exist
        //if exist:
        setIsLoggedIn(true);

        //if not exist:
        //pop up to user
    }

    if (isLoggedIn){
        return (
            <Home /> 
        )
    }
    
    else{
        return (
            <LoginPage OnLogin={handleLogin} /> 
        )
    }

}



export default App;


