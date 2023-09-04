import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../ServerFunctions/UserFunctions';
import { useCookies } from 'react-cookie';
import { fetchArtistByUserId } from '../ServerFunctions/ArtistFunctions';
import welcomeBackround from '../Components/backgrounds/background.jpg'
import userIcon from '../Components/ProfileButton/user-286-64.png';

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['userId']);
    const navigate = useNavigate();

  const getExpirationDate= (rememberMe) => {
    const expirationDate = new Date();

    if (rememberMe) {
      expirationDate.setDate(expirationDate.getDate() + 10);
    } else {
      expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    }

    return expirationDate;
  };

    const onLogin = async (username, password, rememberMe, setErrorMessage) => {
        try {
            const { Id, Type } = await getUser(username, password);
            const expirationDate = getExpirationDate(rememberMe);
            setCookie("userId", Id, { path: "/", expires: expirationDate});
            setCookie("userType", Type, { path: "/", expires: expirationDate});
            if (Type === "artist") {
                const artistId = (await fetchArtistByUserId(Id))._id
                setCookie("artistId", artistId, { path: "/", expires: expirationDate});
            }
            navigate("/home");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found");
            } else {
                setErrorMessage("Login failed");
            }
        }
    }

    return (
    <div className="loginPageDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>
        <div className="loginPageContainer">
        <div><img class='userIcon' src={userIcon}/> </div>
            <h1>Hello and welcome to MusicShare!</h1>
            <h3>Here is the perfect place for you to share and talk<br></br>about your favorite songs and artists</h3>
            <br></br>
            <h3>So.. let's begin!</h3>
            <LoginForm OnLogin={onLogin} />
            <br></br>
            <Link to ="/createUser">
                Create a new user
            </Link>
            <br></br>
            <Link to ="/createArtist">
                Create a new artist account
            </Link>
        </div>
    </div>
    );
}

export default LoginPage;
