import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId } from './serverFunctions';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['userId']);
    const navigate = useNavigate();

    const handleSubmit = async (username, password, rememberMe) => {
        try {
            const userId = await getUserId(username, password);
            setCookie("userId", userId, { path: "/"});
            navigate("/home");
        } catch(error) {}
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const rememberMe = event.target.rememberMe.checked
        handleSubmit(username, password, rememberMe);
    }

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm OnSubmit={onSubmit}  />
            <Link to ="/createuser">
                <div>Create a new user</div>
            </Link>
        </div>
    );
}

export default LoginPage;