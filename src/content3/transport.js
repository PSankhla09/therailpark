import React, { useState } from "react";
import "./transport.css";
import busImg from "./bus.avif";
import subwayImg from "./subway.avif";
import bikeImg from "./bike.avif";
import parkingImg from "./parking.avif";

const transportOptions = [
  {
    mode: "Bus",
    details: "Routes",
    subDetails: "2, 4, 16, 23, 45, 61",
    image: busImg,
  },
  {
    mode: "Subway",
    details: "Broad Street Line to Spring Garden",
    subDetails: "Five minute walk",
    image: subwayImg,
  },
  {
    mode: "Bike",
    details: "Indego Bike Share Station",
    subDetails: "12th & Callowhill",
    image: bikeImg,
  },
  {
    mode: "Parking",
    details: "Paid Street Parking or Paid Surface Lot Parking",
    subDetails: "",
    image: parkingImg,
  },
];

const Transport = () => {
  const [imagesStack, setImagesStack] = useState([busImg]);

  const handleHover = (newImage) => {
    if (imagesStack.includes(newImage)) return;

    setImagesStack((prev) => [...prev, newImage]);

    setTimeout(() => {
      setImagesStack((prev) => prev.slice(1));
    }, 400);
  };

  return (
    <div className="transport-container">
      {/* Left Side: Image */}
      <div className="transport-image-container">
        {imagesStack.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Transport Mode"
            className="transport-image image-active"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Right Side: Transport Information */}
      <div className="transport-list">
        {transportOptions.map((option, index) => (
          <div
            key={index}
            className="transport-item"
            onMouseEnter={() => handleHover(option.image)}
          >
            <div className="transport-left">
              <span className="transport-mode">{option.mode}</span>
              <div className="arrow1">
                <svg
                  width="20"
                  viewBox="0 0 31 30"
                  fill="none"
                  stroke="var(--color-black)"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow1-icon"
                >
                  <path
                    d="M14.968 31.0001L14.968 1M14.968 1L1 16.1733M14.968 1L29 16.1733"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </div>
            <div className="transport-right">
              <span className="transport-details">{option.details}</span>
              <br />
              {option.subDetails && (
                <span className="transport-subdetails">
                  {option.subDetails}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
