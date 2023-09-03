import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
    
const SignUpForm = ({OnSignUp}) => { 

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
      });
      const { firstname, lastname, email, username, password } = formData;

      const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      function isFormNotValid() {
        return (!firstname || !lastname || !email || !username || !password);
      }

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const showAlertMessage = () => {
        window.alert('This is an alert message!');
      };
       
      const onSubmit= (event) => {
        event.preventDefault()
        const profile = {
            FirstName: firstname,
            LastName: lastname,
            Email: email,
        }
        const user = {
            Username: username,
            Password: password,
        }
        OnSignUp(user, profile)
    }

    return (
        <form onSubmit={onSubmit} >
            <h2>Let's create a MusicShare profile!</h2>
            <br></br>
            <label htmlFor='firstname'> First Name: </label>
            <input type='text' name='firstname' value={firstname} onChange={onChange} />
            <br/>
            <label htmlFor='lastname'> Last Name: </label>
            <input type='text' name='lastname' value={lastname} onChange={onChange}/>
            <br/>
            <label htmlFor='email'> Mail: </label>
            <input type='email' name='email' value={email} onChange={onChange} />
            <br/>
            <label htmlFor='username'> User Name: </label>
            <input type='text' name='username' value={username} onChange={onChange}/>
            <br/>
            <label htmlFor='password'> Password: </label>
            <input type='password' name='password' value={password} onChange={onChange}/>
    
            <br/>
            <br/>
           
            {isFormNotValid() ? (
            <p>Don't be lazy! <br></br> Please fill all the boxes above..</p>
    
      ) : (
       
        !validateEmail(email) ? 
        <input type='submit' value='Sign up!' onClick={showAlertMessage}/>
            : 
            <div>
        <input type='submit' value='Sign up!' onSubmit={onSubmit}/> </div>
    
      )} 
        <div> 
         <br></br>
        <Link to='/login'>Back to login page...</Link> </div> 
        </form>
    );

}

export default SignUpForm;