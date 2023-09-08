import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUpForm = ({OnSignUp}) => {
    const [errorMessage, setErrorMessage] = useState('');
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

      const sendErrorMessage = () => {
        setErrorMessage('Please enter a valid email address.');
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        return;
      };

      const onSubmit= (event) => {
        event.preventDefault()
        const profile = {
            firstName: firstname,
            lastName: lastname,
            email: email,
        }
        const user = {
            username: username,
            password: password,
        }
        OnSignUp(user, profile, setErrorMessage)
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
            <p id="errormessage">{errorMessage}</p>
            {isFormNotValid() ? (
            <p>Don't be lazy! <br></br> Please fill all the boxes above..</p>

      ) : (
        !validateEmail(email) ?
            <p style={{ color: 'red' }}>invalid Mail!</p>
            :
        <input type='submit' value='Sign up!'/>
      )}
        <div>
         <br></br>
        <Link to='/login'>Back to login page...</Link> </div>
        </form>
    );

}

export default SignUpForm;