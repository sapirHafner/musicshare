const LoginForm = ({OnLogin}) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const rememberMe = event.target.rememberMe.checked
        OnLogin(username, password, rememberMe);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'> User Name: </label>
            <input type='text' name='username'/>
            <br/>
            <label htmlFor='password'> Password: </label>
            <input type='password' name='password'/>
            <br/>
            <input type='checkbox' name='rememberMe'/>
            <label htmlFor='rememberMe'> Remember me! </label>
            <br/>
            <input type='submit' value='Sign in!'/>
        </form>
    );
}

export default LoginForm;