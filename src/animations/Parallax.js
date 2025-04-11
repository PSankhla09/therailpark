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
        <img
          src={imageUrl}
          alt="Background"
          className="background-image"
          style={{
            opacity: isPlaying ? 0 : 1,
            transition: "opacity 0.5s linear",
          }}
        />
      ) : (
        <video
          ref={videoRef}
          className="background-video"
          muted
          loop
          playsInline
          autoPlay
          style={{
            opacity: isPlaying ? 1 : 0,
            transition: "opacity 0.5s linear",
            backgroundColor: "black",
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Parallax;
