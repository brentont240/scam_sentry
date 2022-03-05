import React from "react";
import knight from "../images/knight.png";

const PageNotFound = () => (
    <div className="text-center mt-5 pt-5">
    <h1 className="display-2">404: Page Not Found</h1> <br/>
    <p>Try going back or visiting a different page.</p>
    <img src={knight} className="img-fluid" alt="Scam sentry knight logo." />
    </div>
);

export default PageNotFound;