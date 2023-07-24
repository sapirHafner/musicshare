import LoginForm from './LoginForm';

function LoginPage({OnLogin}){
    function handleSubmit(event){
        event.preventDefault()
        const userName = event.target.username.value
        const password = event.target.password.value
        const rememberMe = event.target.rememberMe.checked
        OnLogin(userName, password, rememberMe)
        //console.log(userName)
        //console.log(password)
        //console.log(rememberMe)
    }

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm OnSubmit={handleSubmit}  />
        </div>
    );
}

export default LoginPage;