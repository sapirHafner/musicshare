import { useState } from 'react';
import Home from './Home';
import LoginPage from './LoginPage';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [isLoggedIn, setIsLoggedIn] = useState(cookies["userId"] != undefined);

    const fetchUserId = async (username, password) => {
        const response = await axios.get("http://localhost:4000/users", {
            params: {
                Username: username,
                Password: password
            }
        });
        return response.data;
    };

    const handleLogin = async (username, password, rememberMe) => {
        try {
            const userId = await fetchUserId(username, password);
            setCookie("userId", userId, { path: "/"});
            setIsLoggedIn(true);
        } catch(error) {

        }
    };

    return isLoggedIn ? <Home /> : <LoginPage OnLogin={handleLogin} />;
};

export default App;