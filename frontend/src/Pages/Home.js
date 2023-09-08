import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import ArtistHome from "../Components/Homes/ArtistHome";
import UserHome from "../Components/Homes/UserHome";
import AdminHome from "../Components/Homes/AdminHome";

const Home = () => {
    const [cookies] = useCookies();
    const navigate  = useNavigate()

    const { userId, userType } = cookies;
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