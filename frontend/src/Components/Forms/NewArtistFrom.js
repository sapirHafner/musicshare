import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NewArtistFrom = ({OnSignUp}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
      });
      const {fullname, email, username, password } = formData;

      const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      function isFormNotValid() {
        return (!fullname || !email || !username || !password);
      }

    const onSubmit= (event) => {
        event.preventDefault()
        const user = {
            username: username,
            password: password,
        }
        const artist = {
            name: fullname,
            email: email,
        }
        OnSignUp(user, artist)
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Hello artist,</h2>
            <h2>Let's create a MusicShare profile!</h2>
            <br></br>
            <label htmlFor='fullname'> Full Name: </label>
            <input type='text' name='fullname' value={fullname} onChange={onChange}/>
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
        <input type='submit' value='Sign up!'/> 
      )} 
        <div> 
         <br></br>
        <Link to='/login'>Back to login page...</Link> </div> 
        </form>
    );
}

export default NewArtistFrom;