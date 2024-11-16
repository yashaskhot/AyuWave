import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const extractUser = (authToken) => {
  try {
    // Decode the JWT token
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));

    // Extract the user role from the decoded token payload
    return tokenPayload.role || ""; // Replace with the actual key used in your token payload
  } catch (error) {
    console.error("Error extracting user role from authToken:", error);
    return "";
  }
};

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const authToken = cookies.authToken || "";
  const navigate = useNavigate();
  const userRole = extractUser(authToken);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    toast.success("Logged out");
    navigate('/login')
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          <span className="navbar-sign">AyuWave</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
        <Link to="/" className="navbar-links">
            Profile
          </Link>
        </li>
        <li>
        <Link to="/" className="navbar-links">
            Fitness plan
          </Link>
        </li>
        <li>
        <Link to="/" className="navbar-links">
            Diet plan
          </Link>
        </li>
        <li>
        <Link to="/" className="navbar-links">
            Medical record
          </Link>
        </li>
        <li>
        <Link to="/" className="navbar-links">
            Policies
          </Link>
        </li>
        
       
      </ul>

      {authToken ? (
        // If the user is logged in, show Logout button
        <button
          className="navbar-btn"
          type="button"
          disabled={isButtonDisabled}
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        // If the user is not logged in, show Login button
        <button
          className="navbar-btn"
          type="button"
          disabled={isButtonDisabled}
          onClick={handleChatBtnClick}
        >
          <FontAwesomeIcon /> Login
        </button>
      )}
      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>
         
         <div class='five' >
        <ul className="mobile-navbar-links">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
        <Link to="/profile" className="navbar-links">
            Profile
          </Link>
        </li>
        <li>
        <Link to="/plans" className="navbar-links">
            Fitness plan
          </Link>
        </li>
        <li>
        <Link to="/dietplan" className="navbar-links">
            Diet plan
          </Link>
        </li>
        <li>
        <Link to="/UserForm" className="navbar-links">
            Medical record
          </Link>
        </li>
        <li>
        <Link to="/scheme" className="navbar-links">
            Policies
          </Link>
        </li>
        <li>
        <Link to="/product" className="navbar-links">
            Online Pharmacy
          </Link>
        </li>
        </ul>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
