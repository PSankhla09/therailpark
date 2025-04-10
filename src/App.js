import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const waitForFonts = () => {
      return document.fonts.ready;
    };

    const handleAssetLoad = async () => {
      const allAssets = [...document.querySelectorAll("img, video")];
      console.log(`Assets detected: ${allAssets.length}`, allAssets);

      let loadedAssets = 0;
      const totalAssets = allAssets.length + 1; // +1 for fonts

      if (totalAssets === 0) {
        console.log("No assets detected. Hiding preloader.");
        setIsLoading(false);
        return;
      }

      const checkAssetLoaded = () => {
        loadedAssets++;
        if (loadedAssets === totalAssets) {
          console.log("All assets loaded.");
          setIsLoading(false);
        }
      };

      allAssets.forEach((asset) => {
        if (asset.complete || asset.readyState === "complete") {
          console.log(`Asset already loaded: ${asset.src}`);
          checkAssetLoaded();
        } else {
          asset.addEventListener("load", checkAssetLoaded);
          asset.addEventListener("error", checkAssetLoaded);
        }
      });

      await waitForFonts();
      console.log("Fonts loaded.");
      checkAssetLoaded();

      const timeout = setTimeout(() => {
        console.warn("Timeout reached. Hiding preloader.");
        setIsLoading(false);
      }, 20000);

      return () => clearTimeout(timeout);
    };

    handleAssetLoad();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="visit" element={<Visit />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
