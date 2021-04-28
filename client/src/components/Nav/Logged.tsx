import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { UserProps } from "src/App";

export const Logged: React.FC<UserProps> = ({ user }) => {
  const handleLogout = () => {
    axios.get("/logout", { withCredentials: true });
  };

  return (
    <>
      <li>
        Welcome back <strong>{user!.username}</strong>
      </li>
      <li>
        <Link to="/blogs">BLOGS</Link>
      </li>
      <li>
        <Link to="/addblog">ADD POST</Link>
      </li>
      <a href="/" className="btn" onClick={handleLogout}>
        <li className="btn">LOGOUT</li>
      </a>
    </>
  );
};
