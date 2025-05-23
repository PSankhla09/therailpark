import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./topRibbon.css";
import logo from "./logo192.png";
import HamburgerMenu from "./hamburger";

const TopRibbon = ({ user }) => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
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
        <div className="donate-container">
          {user ? (
            <div className="user-info">
              <img src={user.picture} alt={user.name} className="user-image" />
              <span className="user-name">{user.name}</span>
            </div>
          ) : (
            <button className="donate">DONATE</button>
          )}
          <div className="language">ES | 中文</div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
