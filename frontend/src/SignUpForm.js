const SignUpForm = ({OnSubmit}) => {
    return (
        <form onSubmit={OnSubmit}>
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
            <input type='text' name='password'/>
            <br/>
            <br/>
            <input type='submit' value='Sign up!'/>
        </form>
    );
}

export default SignUpForm;