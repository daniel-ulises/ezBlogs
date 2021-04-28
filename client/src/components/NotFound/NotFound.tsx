import React from "react";
import { useLocation, Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="_404-container">
      <h1>Page not found!</h1>
      <p>
        <span className="path-name">{useLocation().pathname}</span> could not be found.
        Did you spell it wrong?
      </p>
      <p>
        Go back to the <Link to="/">HOMEPAGE</Link>
      </p>
    </div>
  );
};
