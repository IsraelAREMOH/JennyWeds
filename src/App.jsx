import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <Navbar />
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
    </>
  );
}

export default App;
