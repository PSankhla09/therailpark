import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";

import { preloadAssets } from "./animations/preloadAssets"; // ✅ import the promise-based function

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preloadAssets().then(() => {
      console.log("✅ Setting isLoading to false");
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="preloader-overlay">
          <Preloader />
        </div>
      )}

      <div className={`App ${isLoading ? "hidden-during-load" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visit" element={<Visit />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
