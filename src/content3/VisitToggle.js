import React from "react";
import "./VisitToggle.css";
import dayImage from "./day-image.avif";
import nightImage from "./night-image.avif";

const VisitToggle = ({ isDay, toggleMode }) => {
  return (
    <div className="visit-container2" data-mode={isDay ? "day" : "night"}>
      {/* Image is now inside the container */}
      <img
        src={isDay ? dayImage : nightImage}
        alt={isDay ? "Day View" : "Night View"}
        className="visit-image"
      />
      <div className="toggle-wrapper">
        {/* Day Button - Only clickable in Night Mode */}
        <button
          className={`toggle-btn left-btn ${isDay ? "inactive" : "active"}`}
          onClick={!isDay ? toggleMode : undefined} // Disable if already active
          disabled={isDay} // Disable button when it's already active
        >
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </span>
          Day
        </button>

        {/* Night Button - Only clickable in Day Mode */}
        <button
          className={`toggle-btn right-btn ${isDay ? "active" : "inactive"}`}
          onClick={isDay ? toggleMode : undefined} // Disable if already active
          disabled={!isDay} // Disable button when it's already active
        >
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          </span>
          Night
        </button>
      </div>
    </div>
  );
};

export default VisitToggle;
