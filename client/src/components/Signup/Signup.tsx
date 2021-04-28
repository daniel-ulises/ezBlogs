import axios from "axios";
import React, { FormEvent } from "react";
import { Redirect } from "react-router-dom";
import { UserProps } from "../..//App";
import { SubmitForm } from "../Login/Login";

export const Signup: React.FC<UserProps> = ({ user, setUser }) => {
  const handleSignup = async (e: SubmitForm & FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e?.target?.username?.value;
    const password = e.target.password.value;

    const req = await axios.post("http://localhost:3100/signup", {
      email,
      username,
      password,
    });

    setUser!(req.data);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSignup} className="user-form">
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="username">USERNAME</label>
          <input type="text" name="username" id="username" />
        </div>

        <div>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" id="password" />
        </div>
        <button name="button">SING UP</button>
      </form>
      {user?.username && <Redirect to="/" />}
    </div>
  );
};
