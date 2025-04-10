import React from "react";
import "./Preloader.css";
import loadingGif from "./loader.gif"; // Replace with your GIF file path

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Preloader;
