import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Pages where navbar menu should be hidden
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // Close sidebar when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <div className="navbar-container">
      <div className="nav-links" ref={menuRef}>
        <div className="left">
          <div id="logo"></div>
          <h4 className="title">Smart Split</h4>
        </div>

        {/* Menu Button */}
        {!hideNavbar && (
          <div
            className="menu-btn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ☰
          </div>
        )}

        {/* Sidebar Navigation */}
        {!hideNavbar && (
          <nav
            className={`right ${isOpen ? "show" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        )}
      </div>
    </div>
  );
}