import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import ProfileDetails from "./components/ProfileDetails";
import Timeline from "./components/TimeLine";
import SkillSet from "./components/Skills";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <LandingPage />
      <ProfileDetails />
      <Timeline />
      <SkillSet />
      <Footer />

      {/* Routes */}
      <Routes>
        <Route path="/about" element={<h1 className="text-xl">About Page</h1>} />
        <Route path="/contact" element={<h1 className="text-xl">Contact Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
