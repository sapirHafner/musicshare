import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const App = () => {
    const [cookies] = useCookies(['userId']);
    const isLoggedIn = () => cookies["userId"] !== undefined;

    return isLoggedIn() ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default App;