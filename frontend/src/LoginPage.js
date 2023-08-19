import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = ({OnLogin}) => {
    const handleSubmit= (event) => {
        event.preventDefault()
        const userName = event.target.username.value
        const password = event.target.password.value
        const rememberMe = event.target.rememberMe.checked
        OnLogin(userName, password, rememberMe)
    }

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm OnSubmit={handleSubmit}  />
            <Link to ="createuser"><div>Create a new user</div></Link>
        </div>
    );
}

export default LoginPage;