import React from "react";
import { Link } from "react-router-dom";
// import knight from '../images/knight.png'

const Footer = () => (
  // TODO: make this look better!
  // TODO: make the footer stick to the bottom!
  <footer className="footer sticky-bottom">
    <div className="container">
      <div className="row">
        {/* format this link to look better (maybe make it in smaller text or something) */}
        <div className="col">
        {/* TODO: put the logo here? */}
        <h2>Scam Sentry</h2>
        <p><i>Suspect, Detect, Protect</i></p>
          <a
            href="https://www.flaticon.com/free-icons/knight"
            title="knight icons"
            rel="noreferrer"
            target="_blank"
          >
            Knight icons created by max.icons - Flaticon
          </a>
        </div>
        <div className="col">
          <h4>Menu</h4>
          <ul className="list-group list-unstyled">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/articles-list'}>Articles</Link>
            </li>
            <li>
              <Link to={'/tools-list'}>Tools</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h4>Useful Links</h4>
          <ul className="list-group list-unstyled">
            <li className="mb-1">
              <a href="https://www.usa.gov/stop-scams-frauds"  rel="noreferrer" target="_blank">Learn how to report scams here.</a> 
            </li>
            <li className="mb-1">
              <a href="https://www.fbi.gov/scams-and-safety/common-scams-and-crimes"  rel="noreferrer" target="_blank">The FBI's list of common scams and crimes.</a> 
            </li> 
            <li className="mb-1">
            <a href="https://www.bbb.org/scamtracker/"  rel="noreferrer" target="_blank">See scams near you with the Better Business Bureau's Scam Tracker.</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="text-center" id="copyright">
        Copyright &copy; {CurrentYear} Scam Sentry
      </p>
    </div>
  </footer>
);

// FIXME: get this to work
// how to show current year!
const CurrentYear = new Date().getFullYear();
// document.querySelector('#copyright').innerHTML += CurrentYear;

export default Footer;
