import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollHandler from "./Components/ScrollHandler";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Travel from "./pages/Travel";
import Footer from "./pages/Footer";
import Registry from "./pages/Registry";
import StylePage from "./pages/Style";

function App() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#e9f3ea] via-[#dfe9d9] to-[#c8b7a6]">
        <Router>
          <Navbar />
          <ScrollHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rsvp" element={<Home />} />
            <Route path="/ourstory" element={<OurStory />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/stylepage" element={<StylePage />} />
            <Route path="/admin/*" element={<Registry />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
