import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { NavBar } from "./components/Nav/NavBar";
import { Home } from "./components/Home/Home";
import { Signup } from "./components/Signup/Signup";
import { Blogs } from "./components/Blogs/Blogs";
import { Blog } from "./components/Blogs/Blog";
import { AddBlog } from "./components/Blogs/AddBlog";
import { NotFound } from "./components/NotFound/NotFound";
import "./app.min.css";

export interface UserProps {
  user?: {
    id: number;
    username: string;
    email: string;
    message: {
      username: string;
      email: string;
      password: string;
    };
  };
  setUser?: React.Dispatch<React.SetStateAction<undefined> & void>;
}

export const App: React.FC = () => {
  const [user, setUser] = useState();

  const checkUser = async () => {
    try {
      const getUser = await axios.get("/auth", {
        withCredentials: true,
      });
      setUser(getUser.data);
      console.log(getUser.data);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar user={user} setUser={setUser} />
            <Home />
          </Route>
          <Route path="/login">
            <NavBar user={user} />
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/signup">
            <NavBar user={user} />
            <Signup user={user} setUser={setUser} />
          </Route>
          <Route path="/blogs">
            <NavBar user={user} />
            <Blogs />
          </Route>
          <Route path="/blog/:id">
            <NavBar user={user} />
            <Blog />
          </Route>
          <Route path="/addblog">
            <AddBlog user={user} />
          </Route>
          <Route path="*">
            <NavBar user={user} />
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
