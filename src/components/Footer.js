import React from "react";
import knight from '../images/knight.png'

const Footer = () => (
  // TODO: make this look better!
  // TODO: make the footer stick to the bottom!
  <footer className="footer sticky-bottom">
    <div className="container">
      <div className="row">
        {/* format this link to look better (maybe make it in smaller text or something) */}
        <div className="col">
        {/* TODO: put the logo here? */}
          <a
            href="https://www.flaticon.com/free-icons/knight"
            title="knight icons"
            rel="noreferrer"
            target="_blank"
          >
            Knight icons created by max.icons - Flaticon
          </a>
        </div>
        <div className="col">Column</div>
        <div className="col">Column</div>
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
