import React, { useState } from "react";
import { FaSearch, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import {
  animateMenuOpen,
  animateMenuClose,
} from "../animations/hamburgerAnimations";
import "./hamburger.css";
import logo from "./logo192.png";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      animateMenuClose();
      setTimeout(() => setIsOpen(false), 500);
    } else {
      setIsOpen(true);
      animateMenuOpen();
    }
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className={`hamburger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Fullscreen Menu */}
      {isOpen && (
        <div className="menu-overlay">
          {/* Top Section with Search & Donate Button */}
          <div className="sticky">
            <div className="menu-header">
              <div className="search-bar">
                <FaSearch />
                <input type="text" placeholder="Search" />
              </div>
              <div className="logo1">
                <img src={logo} alt="Rail Park Logo" />
              </div>
              <button className="donate-btn">DONATE</button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="menu-content">
            {/* Left Column */}
            <div className="menu-column">
              <p>
                <Link to="/">HOME</Link>
              </p>
              <p>
                <Link to="visit">VISIT</Link>
              </p>
              <p>RESOURCES</p>
              <p>NEWS</p>
              <p>ABOUT</p>
              <p>BOOK A TOUR</p>
              <p>SHOP ↗</p>
            </div>

            {/* Middle Column - Visit Section */}
            <div className="menu-column">
              <h4>
                <Link to="visit">VISIT</Link>
              </h4>
              <p className="bold-text">LOCATION</p>
              <p className="bold-text">MAP</p>
              <p className="bold-text">EVENTS</p>
              <p className="bold-text">FAQS</p>
            </div>

            {/* Right Column - Vision Section */}
            <div className="menu-column">
              <h4>VISION</h4>
              <p className="bold-text">PROGRESS</p>
              <p className="bold-text">HISTORY</p>
              <p className="bold-text">TEAM</p>
              <p className="bold-text">DONATE</p>
            </div>

            {/* Side Info Section */}
            <div className="menu-info">
              <h4>Hours & Info</h4>
              <br />
              <p>Free and open daily</p>
              <p>7:00 AM – 10:00 PM</p>
              <br />

              <h4>Entrance</h4>
              <p>N. Broad & Noble Streets</p>
              <p>Philadelphia, PA 19123</p>
              <br />
              <br />
              <br />

              <h4>Follow Along</h4>
              <div className="social-icons">
                <FaInstagram />
                <FaTwitter />
                <FaFacebook />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="menu-footer">
            <div className="footer-column">
              <p>Say Hello</p>
              <p>friends@therailpark.org</p>
              <p>215-485-2221</p>
            </div>
            <div className="footer-column">
              <p>Office</p>
              <p>1219 Vine Street, Suite M</p>
              <p>Philadelphia, PA 19107</p>
            </div>
            <div className="footer-column">
              <p>© 2025 Friends of the Rail Park</p>
              <p>The Friends of the Rail Park is a 501(c)3.</p>
              <p>All donations are tax-deductible.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
