import React from "react";
import useIntersectionObserver from "../animations/useIntersectionObserver"; // Import the custom hook
import "./text.css";

const Text = () => {
  // Use the Intersection Observer hook
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3, // Trigger when 30% of the element is visible
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
