import axios from "axios";
import React, { FormEvent } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserProps } from "../../App";
import { SubmitForm } from "../Login/Login";

export const Signup: React.FC<UserProps> = ({ user, setUser }) => {
  const handleSignup = async (e: SubmitForm & FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e?.target?.username?.value;
    const password = e.target.password.value;

    const req = await axios.post("/signup", {
      email,
      username,
      password,
    });

    setUser!(req.data);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSignup} className="user-form">
        <div className="error-msg" style={{ height: "1rem" }}></div>
        <div>
          <span className="form-error">{user?.message ? user?.message.email : null}</span>
          <label htmlFor="email">EMAIL</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <span className="form-error">
            {user?.message ? user.message.username : null}
          </span>
          <label htmlFor="username">USERNAME</label>
          <input type="text" name="username" id="username" />
        </div>

        <div>
          <span className="form-error">
            {user?.message ? user.message.password : null}
          </span>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="register-login">
          <span>
            Already registered? Sign in <Link to="/login">here</Link>
          </span>
        </div>
        <button name="button">SING UP</button>
      </form>
      {user?.username && <Redirect to="/" />}
    </div>
  );
};
