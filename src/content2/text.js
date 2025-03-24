import React from "react";
import useIntersectionObserver from "../animations/useIntersectionObserver";
import "./text.css";

const Text = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={`txt ${isVisible ? "fade-in" : ""}`}>
      We are building a <br />
      <span>three mile greenway</span>
      <br />
      with three distinct sections <br />
      across ten neighborhoods <br />
      <br />
      <p>And there’s a lot more to do</p>
    </div>
  );
};

export default Text;
