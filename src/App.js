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
  const observerRef = useRef(null);

  const incrementLoadedAssets = () => {
    setLoadedAssets((prev) => {
      const updated = prev + 1;
      console.log(`Loaded assets: ${updated}/${totalAssets}`);
      return updated;
    });
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
      img.addEventListener("load", onLoadOrError);
      img.addEventListener("error", onLoadOrError);
    }
  };

  const detectAndTrackImages = () => {
    const images = Array.from(document.querySelectorAll("img"));
    const newImages = images.filter((img) => !trackedAssets.current.has(img));

    if (newImages.length === 0) return;

    newImages.forEach((img) => {
      trackedAssets.current.add(img);
      handleImage(img);
    });

    const total = trackedAssets.current.size;
    setTotalAssets(total);
    console.log("Image tracking started. Total assets:", total);
  };

  useEffect(() => {
    const startTrackingAfterDOMSettles = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            console.log(
              "DOM rendered and stable. Now starting image tracking."
            );
            detectAndTrackImages();
            setupMutationObserver();
          }, 100);
        });
      });
    };

    startTrackingAfterDOMSettles();

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const setupMutationObserver = () => {
    observerRef.current = new MutationObserver(() => {
      console.log("Mutation observed, rechecking for new images...");
      detectAndTrackImages();
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  useEffect(() => {
    if (totalAssets > 0 && loadedAssets >= totalAssets) {
      console.log("✅ All assets loaded. Hiding preloader.");
      setIsLoading(false);
    }
  }, [loadedAssets, totalAssets]);

  return (
    <div className="App">
      {/* Main app content (always rendered, even during loading) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visit" element={<Visit />} />
      </Routes>
      <Footer />

      {/* Preloader overlay shown on top */}
      {isLoading && (
        <div className="preloader-overlay">
          <Preloader />
        </div>
      )}
    </div>
  );
}

export default App;
