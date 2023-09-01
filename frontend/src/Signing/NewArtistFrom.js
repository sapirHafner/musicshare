import { Link } from 'react-router-dom';
const NewArtistFrom = ({OnSignUp}) => {
    const onSubmit= (event) => {
        event.preventDefault()
        const user = {
            Username: event.target.username.value,
            Password: event.target.password.value,
        }
        const artist = {
            Name: event.target.name.value,
            Email: event.target.email.value,
        }
        OnSignUp(user, artist)
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Hello artist,</h2>
            <h2>Let's create a MusicShare profile!</h2>
            <br></br>
            <label htmlFor='name'> Name: </label>
            <input type='text' name='name'/>
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
            <br></br>
            <br></br>
            <Link to='/login'>Back to login page...</Link>
        </form>
    );
}

export default NewArtistFrom;