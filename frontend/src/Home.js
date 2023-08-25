import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MusicshareNavigationBar from "./MusicshareNavigationBar";

const Home = () => {
    const [cookies] = useCookies(['userId', 'userType']);
    const { userId, userType } = cookies;
    const navigate  = useNavigate()

    useEffect(() => {
        if (userId === undefined) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <MusicshareNavigationBar selectedItem = "Home"/>
            <h1>Welcome to MusicShare!</h1>
            <h2> You are at home! </h2>
        </div>
    );
};

export default Home;