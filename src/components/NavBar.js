import React from "react";
import { Link, NavLink } from "react-router-dom";
import knight from "../images/knight.png";

const NavBar = () => (
  //maybe use the navbar that I made for my thingy
  // try different color schemes with this\
  // TODO: Make the font size larger!

  <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
    <div className="container-lg">
      {/* FIXME: make the font size larger? */}
      <Link className="navbar-brand" to="/">
        <img src={knight} width={40} height={40} className="me-3" alt="Scam Sentry logo."></img>Scam
        Sentry
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {/* see where a good place to position this would be */}
        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
          <NavLink className="nav-link" aria-current="page" onClick={closeMenu} to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" onClick={closeMenu} to="/articles-list">
            Articles
          </NavLink>
          <NavLink className="nav-link" onClick={closeMenu} to="/tools-list" >
            Tools
          </NavLink>
        </div>
      </div>
    </div>
  </nav>

);

// closes the hamburger menu when a link is clicked
function closeMenu(){
  const screensize = window.innerWidth;
  if(screensize < 992){
    const navbarToggler = document.querySelector('.navbar-toggler-icon');
    navbarToggler.click();
  }
  else return;
}


export default NavBar;
