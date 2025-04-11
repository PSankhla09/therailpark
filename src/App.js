import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";
import { preloadAssets } from "./animations/preloadAssets";
import { jwtDecode } from "jwt-decode";
import LoginScreen from "./animations/LoginScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let timeoutId;

    const startPreload = async () => {
      try {
        timeoutId = setTimeout(() => {
          console.warn("⏳ 45-second timeout reached. Hiding preloader.");
          setTimeoutReached(true);
          setIsLoading(false);
        }, 45000);

        await preloadAssets();
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
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      picture: decoded.picture,
    };
    setUser(userData);
    localStorage.setItem("googleUser", JSON.stringify(userData));
  };

  return (
    <>
      {/* Preloader always takes priority */}
      {isLoading && (
        <div className="preloader-overlay">
          <Preloader />
        </div>
      )}

      {/* Main app always appears (preload will show above it in any case.) */}
      <div className={`App ${isLoading ? "hidden-during-load" : ""}`}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/visit" element={<Visit user={user} />} />
        </Routes>
        <Footer />
      </div>

      {/* Black fullscreen login overlay after preload */}
      {!isLoading && !user && <LoginScreen onSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;
