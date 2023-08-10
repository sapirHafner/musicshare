import LoginForm from './LoginForm';

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
            <div>Create a new user</div>
        </div>
    );
}

export default LoginPage;