import axios from "axios";
import React from "react";
import { FormEvent } from "react";
import { Redirect } from "react-router-dom";
import { UserProps } from "../../App";

export type SubmitForm = {
  preventDefault: () => void;
  target: {
    username?: { value: string };
    email: { value: string };
    password: { value: string };
  };
};

export const Login: React.FC<UserProps> = ({ user, setUser }) => {
  const handleLogin = async (e: SubmitForm & FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const req = await axios.post(
      "/signin",
      { email, password },
      { withCredentials: true }
    );

    setUser!(req.data);
  };

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>LOG IN</button>
      </form>
      {user?.username && <Redirect to="/" />}
    </div>
  );
};
