import React from "react";
import "./Preloader.css";
import loadingGif from "./loader.gif";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Preloader;
