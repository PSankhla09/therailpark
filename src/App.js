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
    const waitForFonts = async () => {
      await document.fonts.ready;
      console.log("Fonts loaded.");
    };

    const handleAssetLoad = async () => {
      const detectAssets = () => {
        const allAssets = [...document.querySelectorAll("img, video")];
        console.log(`Assets detected: ${allAssets.length}`, allAssets);
        return allAssets;
      };

      let loadedAssets = 0;
      const allAssets = detectAssets();
      const totalAssets = allAssets.length + 1; // +1 for fonts

      if (totalAssets === 0) {
        console.log("No assets detected. Hiding preloader.");
        setIsLoading(false);
        return;
      }

      const checkAssetLoaded = () => {
        loadedAssets++;
        console.log(`Loaded assets: ${loadedAssets}/${totalAssets}`);
        if (loadedAssets === totalAssets) {
          console.log("All assets loaded.");
          setIsLoading(false);
        }
      };

      // Check each asset (images and videos)
      allAssets.forEach((asset) => {
        if (asset.complete || asset.readyState === "complete") {
          console.log(`Asset already loaded: ${asset.src}`);
          checkAssetLoaded();
        } else {
          asset.addEventListener("load", checkAssetLoaded);
          asset.addEventListener("error", () => {
            console.error(`Asset failed to load: ${asset.src}`);
          });
        }
      });

      // Wait for fonts to load
      await waitForFonts();
      checkAssetLoaded();
    };

    // Use MutationObserver to detect dynamically added assets
    const observer = new MutationObserver(() => {
      console.log("DOM changed. Re-running asset detection.");
      handleAssetLoad();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial asset load
    handleAssetLoad();

    return () => observer.disconnect(); // Cleanup observer on unmount
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
