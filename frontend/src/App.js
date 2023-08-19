import { useState } from 'react';
import Home from './Home';
import LoginPage from './LoginPage';
import { useCookies } from 'react-cookie';
import { getUserId } from "./serverFunctions";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [isLoggedIn, setIsLoggedIn] = useState(cookies["userId"] !== undefined);

    const handleLogin = async (username, password, rememberMe) => {
        try {
            const userId = await getUserId(username, password);
            setCookie("userId", userId, { path: "/"});
            setIsLoggedIn(true);
        } catch(error) {

        }
    };

    return isLoggedIn ? <Home /> : <LoginPage OnLogin={handleLogin} />;
};

export default App;