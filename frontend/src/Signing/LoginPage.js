import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../serverFunctions';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['userId']);
    const navigate = useNavigate();

    const onLogin = async (username, password, rememberMe) => {
        try {
            const { Id, Type } = await getUser(username, password);
            setCookie("userId", Id, { path: "/"});
            setCookie("userType", Type, { path: "/"});
            navigate("/home");
        } catch(error) {}
    }

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm OnLogin={onLogin}  />
            <Link to ="/createUser">
                <div>Create a new user</div>
            </Link>
            <Link to ="/createArtist">
                <div>Create a new artist profile</div>
            </Link>
        </div>
    );
}

export default LoginPage;