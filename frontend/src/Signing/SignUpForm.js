const SignUpForm = ({OnSignUp}) => {
    const onSubmit= (event) => {
        event.preventDefault()
        const profile = {
            FirstName: event.target.firstname.value,
            LastName: event.target.lastname.value,
            Email: event.target.email.value
        }
        const user = {
            Username: event.target.username.value,
            Password:event.target.password.value
        }
        OnSignUp(user, profile)
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='firstname'> First Name: </label>
            <input type='text' name='firstname'/>
            <br/>
            <label htmlFor='lastname'> Last Name: </label>
            <input type='text' name='lastname'/>
            <br/>
            <label htmlFor='email'> Mail: </label>
            <input type='text' name='email'/>
            <br/>
            <label htmlFor='username'> User Name: </label>
            <input type='text' name='username'/>
            <br/>
            <label htmlFor='password'> Password: </label>
            <input type='password' name='password'/>
            <br/>
            <br/>
            <input type='submit' value='Sign up!'/>
        </form>
    );
}

export default SignUpForm;