import LoginForm from '../Components/Forms/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import welcomeBackround from '../Assets/backgrounds/background.jpg'
import userIcon from '../Assets/Icons/user-icon.png';

import { validateUser } from '../Common/ServerFunctions/UserFunctions';
import { fetchArtistByUserId } from '../Common/ServerFunctions/ArtistFunctions';

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
            const { id, type } = await validateUser(username, password);
            const expirationDate = getExpirationDate(rememberMe);
            setCookie("userId", id, { path: "/", expires: expirationDate});
            setCookie("userType", type, { path: "/", expires: expirationDate});
            if (type === "artist") {
                const artistId = (await fetchArtistByUserId(id))._id
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
