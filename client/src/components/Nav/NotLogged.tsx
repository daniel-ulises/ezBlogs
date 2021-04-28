import React from "react";
import { Link } from "react-router-dom";

export const NotLogged: React.FC = () => {
  return (
    <>
      <li>
        <Link to="/login">LOGIN</Link>
      </li>
      <li>
        <Link to="/signup" className="btn">
          SIGNUP
        </Link>
      </li>
    </>
  );
};
