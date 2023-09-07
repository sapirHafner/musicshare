import { useState } from "react"

const LoginForm = ({OnLogin}) => {
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const rememberMe = event.target.rememberMe.checked
        OnLogin(username, password, rememberMe, setErrorMessage);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'> User Name:</label>
            <input type='text' name='username'/>
            <br/>
            <label htmlFor='password'> Password: </label>
            <input type='password' name='password'/>
            <br/>
            <input type='checkbox' name='rememberMe'/>
            <label htmlFor='rememberMe'> Remember me! </label>
            <br/>
            <p id="errormessage">{errorMessage}</p>
            <input type='submit' value='Sign in!'/>
        </form>
    );
}

export default LoginForm;