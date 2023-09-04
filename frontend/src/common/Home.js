import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ArtistHome from "../Artist/ArtistHome";
import UserHome from "../User/UserHome";
import AdminHome from "../Admin/AdminHome";

const Home = () => {
    const [cookies] = useCookies(['userId', 'userType']);
    const { userId, userType } = cookies;
    const navigate  = useNavigate()

    useEffect(() => {
        if (!userId) {
            navigate("/")
        }
    }, [])

    const homes = {
        "user":  <UserHome />,
        "artist": <ArtistHome />,
        "admin": <AdminHome />
    }

    return (
        homes[userType]
    );
};

export default Home;