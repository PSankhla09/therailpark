import React, { useEffect, useState } from "react";
import useIntersectionObserver from "../animations/useIntersectionObserver";
import ActualParallax from "../animations/ActualParallax";
import "./text.css";
import visitVideo from "./visit-video-placeholder-small.mp4";

const Text = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
  });

  const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0 });
  const [showVideo, setShowVideo] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setVideoPosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    setShowVideo(true);
  };

  const handleMouseLeave = () => {
    setShowVideo(false);
  };
  useEffect(() => {
    const container = document.querySelector(".hover-target");
    const get = container.getBoundingClientRect();
    console.log(get);
  }, []);
  return (
    <ActualParallax speed={0.2}>
      <div ref={ref} className={`txt ${isVisible ? "fade-in" : ""}`}>
        We are building a <br />
        <span
          className="hover-target"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          three mile greenway
        </span>
        <br />
        with three distinct sections <br />
        across ten neighborhoods <br />
        <br />
        <p>And there’s a lot more to do</p>
      </div>
      <video
        className={`hover-video ${showVideo ? "show" : ""}`}
        src={visitVideo}
        autoPlay
        loop
        muted
        style={{
          top: `${videoPosition.y}px`,
          left: `${videoPosition.x}px`,
        }}
      />
    </ActualParallax>
  );
};

export default Text;
