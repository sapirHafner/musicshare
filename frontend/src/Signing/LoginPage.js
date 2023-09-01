import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../ServerFunctions/UserFunctions';
import { useCookies } from 'react-cookie';
import { fetchArtistByUserId } from '../ServerFunctions/ArtistFunctions';
import welcomeBackround from '../Components/backgrounds/background.jpg'

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['userId']);
    const navigate = useNavigate();
    
    const onLogin = async (username, password, rememberMe) => {
        try {
            const { Id, Type } = await getUser(username, password);
            setCookie("userId", Id, { path: "/"});
            setCookie("userType", Type, { path: "/"});
            if (Type === "artist") {
                const artistId = (await fetchArtistByUserId(Id))._id
                setCookie("artistId", artistId, { path: "/"});
            }
            navigate("/home");
        } catch(error) {
            console.log(error)
        }
    }

    return (
    <div className="loginPageDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>
        <div className="loginPageContainer">            
            <h1>Hello and welcome to MusicShare!</h1>
            <h3>Here is the perfect place for you to share and talk<br></br>about your favorite songs and artists</h3>
            <br></br>
            <h3>So.. let's begin!</h3>
            <LoginForm OnLogin={onLogin} />
            <br></br>
            <Link to ="/createUser">
                <div>Create a new user</div>
            </Link>
            <Link to ="/createArtist">
                <div>Create a new artist account</div>
            </Link>
        </div>
    </div>
    );
}

export default LoginPage;
