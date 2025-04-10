import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  const trackedAssets = useRef(new Set());
  const mutationTimeout = useRef(null);
  const observerRef = useRef(null);

  const incrementLoadedAssets = () => {
    setLoadedAssets((prev) => {
      const updated = prev + 1;
      console.log(`Loaded assets: ${updated}/${totalAssets}`);
      return updated;
    });
  };

  const detectAndTrackImages = () => {
    const images = Array.from(document.querySelectorAll("img"));
    const newImages = images.filter((img) => !trackedAssets.current.has(img));

    newImages.forEach((img) => {
      trackedAssets.current.add(img);
      handleImage(img);
    });

    const updatedTotal = trackedAssets.current.size;
    setTotalAssets(updatedTotal);
    console.log("Updated total assets (images only):", updatedTotal);
  };

  const handleImage = (img) => {
    const onLoadOrError = () => {
      incrementLoadedAssets();
      img.removeEventListener("load", onLoadOrError);
      img.removeEventListener("error", onLoadOrError);
    };

    if (img.complete) {
      onLoadOrError();
    } else {
      console.log(`Waiting for image: ${img.src}`);
      img.addEventListener("load", onLoadOrError);
      img.addEventListener("error", onLoadOrError);
    }
  };

  const setupMutationObserver = () => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new MutationObserver(() => {
      if (mutationTimeout.current) clearTimeout(mutationTimeout.current);
      mutationTimeout.current = setTimeout(() => {
        console.log("DOM mutated. Checking for new images...");
        detectAndTrackImages();
      }, 300);
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  useEffect(() => {
    const loadAllImages = async () => {
      console.log("Initial image detection...");
      detectAndTrackImages();

      setupMutationObserver();
    };

    loadAllImages();

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (mutationTimeout.current) clearTimeout(mutationTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (totalAssets > 0 && loadedAssets >= totalAssets) {
      console.log("All images loaded. Hiding preloader.");
      setIsLoading(false);
    }
  }, [loadedAssets, totalAssets]);

  return (
    <div className="App">
      {isLoading ? (
        <div className="preloader-overlay">
          <Preloader />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visit" element={<Visit />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
