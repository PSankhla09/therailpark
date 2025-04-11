import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./content2/footer";
import Home from "./pages/home";
import Visit from "./pages/visit";
import Preloader from "./animations/Preloader";
import { preloadAssets } from "./animations/preloadAssets";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => clearTimeout(timeoutId);
  }, [timeoutReached]);

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

      {/* Main app always renders (preload will show above it anyway) */}
      <div className={`App ${isLoading ? "hidden-during-load" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visit" element={<Visit />} />
        </Routes>
        <Footer />
      </div>

      {/* Black full-screen login overlay AFTER preload */}
      {!isLoading && !user && (
        <div className="login-overlay">
          <h1 className="login-title">Welcome to The Rail Park</h1>
          <div className="google-button-container">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
