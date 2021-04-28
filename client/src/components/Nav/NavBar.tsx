import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserProps } from "../../App";
import { Logged } from "./Logged";
import { NotLogged } from "./NotLogged";

export const NavBar: React.FC<UserProps> = ({ user, setUser }) => {
  const checkUser = async () => {
    await axios
      .get("/auth")
      .then(res => setUser!(res.data))
      .catch(err => err);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav>
      <Link to="/">
        <h1>
          <span className="nav-name-ez">ez</span>
          <span className="nav-name-blogs">Blogs</span>
        </h1>
      </Link>
      <ul className="main-menu">
        {user?.username ? <Logged user={user} setUser={setUser} /> : <NotLogged />}
        <li></li>
      </ul>
    </nav>
  );
};
