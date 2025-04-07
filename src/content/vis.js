import React, { useEffect, useState } from "react";
import useIntersectionObserver from "../animations/useIntersectionObserver"; // Import the custom hook
import "./vis.css";
import parkData from "./parkData";
import Parallax from "../animations/Parallax";

import { useLocation } from "react-router-dom";
import ActualParallax from "../animations/ActualParallax";

const Arrow = ({ inverted = false }) => (
  <span className={`arrow ${inverted ? "inverted" : ""}`}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </span>
);

const Visit = () => {
  const location = useLocation();
  const isVisitPage = location.pathname === "/visit";

  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ActualParallax speed={0.35}>
      <div className={`visit-container ${isVisitPage ? "special-layout" : ""}`}>
        <br />
        {!isVisitPage ? (
          <div className="titl" ref={ref}>
            <h1 className={`${isVisible ? "fade-in" : ""}`}>
              Visiting the Rail Park
            </h1>
          </div>
        ) : (
          ""
        )}
        <div className="d">
          {/* Section 1: Noble St Entrance */}
          <div className="section">
            {(windowWidth <= 900 || !isVisitPage) && (
              <Parallax {...parkData[0]} />
            )}
            <div className="text-container">
              {(windowWidth <= 900 || !isVisitPage) && (
                <Arrow inverted={true} />
              )}
              <h2>
                Noble St <br /> Entrance
              </h2>{" "}
              <button
                class="ada-button ada--mobile"
                aria-labelledby="tooltip-accessible"
              >
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 68 68"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M66 33.7C66 15.9 51.5 1.5 33.7 1.5C15.9 1.5 1.5 15.9 1.5 33.7C1.5 51.5 15.9 66 33.7 66C51.5 66 66 51.5 66 33.7ZM0 33.7C0 15.1 15.1 0 33.7 0C52.3 0 67.4 15.1 67.4 33.7C67.4 52.3 52.3 67.5 33.7 67.5C15.1 67.5 0 52.3 0 33.7Z"></path>
                  <path d="M41.8 18.3C40.2 18.3 38.8 19.6 38.8 21.3C38.8 22.9 40.1 24.3 41.8 24.3C43.4 24.3 44.8 23 44.8 21.3C44.7 19.7 43.4 18.3 41.8 18.3Z"></path>
                  <path d="M31.4 20.5C30.4 20.5 29.3 20.9 28.5 21.7L25 25L26.8 26.9L30.3 23.5C30.6 23.2 31 23.1 31.4 23.1C31.7 23.1 31.9 23.2 32.1 23.3L34.5 24.6L26.8 31.8C26.7 31.8 26.7 31.9 26.6 31.9L28.1 33.4C29 32.9 30 32.7 31.1 32.7C34.7 32.7 37.7 35.6 37.7 39.3C37.7 40.4 37.4 41.4 37 42.3L38.5 43.8C39.3 42.5 39.8 41 39.8 39.3C39.8 37.7 39.4 36.2 38.6 34.9L42.4 34.7L41.5 43.6L44.1 43.9L45.1 33.5C45.1 33.1 45 32.7 44.7 32.5C44.5 32.2 44.1 32.1 43.8 32.1H43.7L37.5 32.5L40.8 28.2C41.7 27.1 41.3 25.5 40.1 24.9L36.9 23L33.4 21C32.7 20.7 32 20.5 31.4 20.5Z"></path>
                  <path d="M25.3 32.9C23.6 34.5 22.5 36.7 22.5 39.3C22.5 44 26.4 47.9 31.1 47.9C33.6 47.9 35.9 46.8 37.5 45.1L36 43.6C34.8 45 33 45.8 31.1 45.8C27.5 45.8 24.5 42.9 24.5 39.2C24.5 37.2 25.4 35.5 26.7 34.3L25.3 32.9Z"></path>
                </svg>
                <span class="ada-tooltip" id="tooltip-accessible">
                  This entrance is wheelchair accessible, with an ADA compliant
                  slope.
                </span>
              </button>
              <p>
                1300 Noble St.
                <span>
                  <a
                    href="https://maps.google.com/..."
                    className="directions-link"
                  >
                    Get Directions
                  </a>
                </span>
              </p>
            </div>
            {/* Add Arrow */}
          </div>

          {/* Section 2: Callowhill St Entrance */}
          <div className="section">
            <div className="text-container">
              {/* Add Arrow */}
              {(windowWidth <= 900 || !isVisitPage) && <Arrow />}

              <h2>
                Callowhill St <br />
                Entrance
              </h2>
              <button
                class="ada-button ada--mobile"
                aria-labelledby="tooltip-non-accessible"
              >
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 68 68"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M41.8 25.8H50.6V28H44V35.7H36.3V43.4H28.6V51.1H20.1V48.9H26.4V41.2H34.1V33.5H41.8V25.8ZM20.5 34.1L34.8 19.8V25H37V16H28V18.2H33.2L19 32.5L20.5 34.1ZM67.1 33.6C67.1 52.1 52 67.2 33.5 67.2C15.1 67.1 0 52.1 0 33.6C0 15.1 15.1 0 33.6 0C52.1 0 67.1 15.1 67.1 33.6ZM65.7 33.6C65.7 15.9 51.3 1.5 33.6 1.5C15.9 1.5 1.5 15.9 1.5 33.6C1.5 51.3 15.9 65.7 33.6 65.7C51.3 65.7 65.7 51.3 65.7 33.6Z"></path>
                </svg>
                <span class="ada-tooltip" id="tooltip-non-accessible">
                  This entrance is a staircase. For ramp access, use the Noble
                  St. entrance.
                </span>
              </button>
              <p>
                Between 11th & 12th St.{" "}
                <a
                  href="https://maps.google.com/..."
                  className="directions-link"
                >
                  Get Directions
                </a>
              </p>
            </div>
            {(windowWidth <= 900 || !isVisitPage) && (
              <Parallax {...parkData[1]} />
            )}
          </div>
        </div>
      </div>
    </ActualParallax>
  );
};

export default Visit;
