import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default UserLayout 