import axios from "axios";
import React from "react";
import { FormEvent } from "react";
import { Redirect, Link } from "react-router-dom";
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

    const req = await axios.post("/signin", { email, password });

    setUser!(req.data);
  };

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleLogin}>
        <div>
          <span className="form-error">{user?.message ? user.message.email : null}</span>
          <label htmlFor="email">EMAIL</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <span className="form-error">
            {user?.message ? user.message.password : null}
          </span>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" id="password" />
        </div>

        <span className="register-login">
          Not registered? Create an account <Link to="/signup">here</Link>
        </span>
        <button>LOG IN</button>
      </form>
      {user?.username && <Redirect to="/" />}
    </div>
  );
};
