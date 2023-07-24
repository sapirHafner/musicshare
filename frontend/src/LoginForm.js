function LoginForm({OnSubmit}){
    return (
        <form onSubmit={OnSubmit}>
            <label htmlFor='username'> User Name: </label>
            <input type='text' name='username'/>
            <br/> 
            <label htmlFor='password'> Password: </label>
            <input type='text' name='password'/> 
            <br/> 
            <input type='checkbox' name='rememberMe'/>
            <label htmlFor='rememberMe'> Remember me! </label>
            <br/> 
            <input type='submit' value='Sign in!'/>      
        </form>
    );
}

export default LoginForm;