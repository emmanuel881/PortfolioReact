import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "../components/LandingPage"
import ProfileDetails from "../components/ProfileDetails"
import Timeline from "../components/TimeLine"
import SkillSet from "../components/Skills"
import Footer from "../components/Footer"

function Home() {
    return (
        <>
            <LandingPage />
            <ProfileDetails />
            <Timeline />
            <SkillSet />
            <Footer />

            {/* Routes */}
        </>
    );
}

export default Home;
