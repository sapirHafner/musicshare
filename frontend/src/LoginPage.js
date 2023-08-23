import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId } from './serverFunctions';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['userId']);
    const navigate = useNavigate();

    const onLogin = async (username, password, rememberMe) => {
        try {
            const userId = await getUserId(username, password);
            setCookie("userId", userId, { path: "/"});
            navigate("/home");
        } catch(error) {}
    }

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm OnLogin={onLogin}  />
            <Link to ="/createuser">
                <div>Create a new user</div>
            </Link>
        </div>
    );
}

export default LoginPage;