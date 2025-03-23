import React, { useState, useRef } from "react";
import "./Parallax.css";

const Parallax = ({ imageUrl, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="parallax-media"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isPlaying ? (
        <img src={imageUrl} alt="Background" className="background-image" />
      ) : (
        <video
          ref={videoRef}
          className="background-video"
          muted
          loop
          playsInline
          autoPlay
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Parallax;
