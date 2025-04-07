import React, { useEffect, useRef, useState } from "react";

const ActualParallax = ({ children, speed = 0.5 }) => {
  const parallaxRef = useRef(null);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(
    window.innerWidth > 800
  );
  const [defaultTransform, setDefaultTransform] = useState(""); // Store the default transform

  useEffect(() => {
    const handleResize = () => {
      setIsParallaxEnabled(window.innerWidth > 800); // Enable parallax only if width > 800px
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Capture the default transform value when the component mounts
    if (parallaxRef.current) {
      const computedStyle = getComputedStyle(parallaxRef.current);
      setDefaultTransform(computedStyle.transform || "none");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        if (isParallaxEnabled) {
          const offset = window.scrollY * speed; // Calculate offset based on scroll position

          // Preserve other transform values and only update translateY
          const existingTransform = getComputedStyle(
            parallaxRef.current
          ).transform;
          const updatedTransform = existingTransform.includes("matrix")
            ? existingTransform.replace(
                /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/,
                (_, a, b, c, d, e, f) =>
                  `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${-offset})`
              )
            : `translateY(${-offset}px)`;

          parallaxRef.current.style.transform = updatedTransform;
        } else {
          // Reset to the default transform value
          parallaxRef.current.style.transform = defaultTransform;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isParallaxEnabled, speed, defaultTransform]);

  return <div ref={parallaxRef}>{children}</div>;
};

export default ActualParallax;
