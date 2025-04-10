import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";
import { preloadAssets } from "./animations/preloadAssets";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    let timeoutId;

    const startPreload = async () => {
      try {
        timeoutId = setTimeout(() => {
          console.warn("⏳ 30-second timeout reached. Hiding preloader.");
          setTimeoutReached(true);
          setIsLoading(false);
        }, 30000); // 30 seconds

        await preloadAssets(); // wait for all assets to preload
        if (!timeoutReached) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during asset preloading:", error);
        setIsLoading(false);
      }
    };

    startPreload();

    return () => clearTimeout(timeoutId);
  }, [timeoutReached]);

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
