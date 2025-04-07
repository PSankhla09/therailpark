import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const ActualParallax = ({ children, speed = 0.5 }) => {
  const parallaxRef = useRef(null);
  const location = useLocation();
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(
    window.innerWidth > 800 && location.pathname !== "/visit"
  );
  const [defaultTransform, setDefaultTransform] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsParallaxEnabled(
        window.innerWidth > 800 && location.pathname !== "/visit"
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (parallaxRef.current) {
      const computedStyle = getComputedStyle(parallaxRef.current);
      setDefaultTransform(computedStyle.transform || "none");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        if (isParallaxEnabled) {
          const offset = window.scrollY * speed;

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
