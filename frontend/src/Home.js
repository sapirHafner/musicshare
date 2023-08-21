import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MusicshareNavigationBar from "./MusicshareNavigationBar";


const Home = () => {
    const [cookies] = useCookies(['userId']);
    const navigate  = useNavigate()

    useEffect(() => {
        if (cookies['userId'] === undefined) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <MusicshareNavigationBar selectedItem = "Home"  />
            <h1>Welcome to MusicShare!</h1>
            <h2> You are at home! </h2>;
        </div>
    );
};

export default Home;