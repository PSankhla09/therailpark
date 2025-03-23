import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./topRibbon.css";
import logo from "./logo192.png";
import HamburgerMenu from "./hamburger";

const TopRibbon = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0); // Stores last scroll position

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`ribbon ${hidden ? "hide" : ""}`}>
      <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="menu-item">
        <Link to="visit">VISIT</Link>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Rail Park Logo" />
        </Link>
      </div>
      <div className="menu-item">
        <a href="#">VISION</a>
      </div>
      <div className="donate-container">
        <button className="donate">DONATE</button>
        <div className="language">ES | 中文</div>
      </div>
    </div>
  );
};

export default TopRibbon;
