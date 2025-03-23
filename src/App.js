import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/therailpark" element={<Home />} />
          <Route path="/visit" element={<Visit />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
