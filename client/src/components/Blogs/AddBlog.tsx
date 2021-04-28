import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UserProps } from "../../App";

export type BlogFormInput = {
  preventDefault: () => void;
  target: {
    title: { value: string };
    snippet: { value: string };
    content: { value: string | number };
    reset: () => void;
  };
};

type messageProps = {
  message: string;

  post: [number];
};

export const AddBlog: React.FC<UserProps> = ({ user }) => {
  const [message, setMessage]: any = useState([]);
  const handleSubmit = async (e: BlogFormInput & FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = await axios.post("http://localhost:3100/post/blog", {
      title: e.target.title.value,
      snippet: e.target.snippet.value,
      author: user?.username,
      content: e.target.content.value,
    });

    setMessage(req.data);
    e.target.reset();
  };

  const messageDisplay = message.map((msg: messageProps) => {
    <li className="submit-message">
      {msg.message}, check it out <Link to={`/blog/${msg.post[0]}`}>here!</Link>
    </li>;
  });

  return (
    <div className="create-blog">
      <div className="addblog-navigation">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/blogs">BLOGS</Link>
          </li>
          {message.length > 0 ? messageDisplay : null}
        </ul>
      </div>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-title-snippet">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="snippet">Snippet</label>
            <span className="snippet">Give a short description of the blog itself</span>
            <input type="text" name="snippet" id="snippet" />
          </div>
        </div>
        <div className="text-area-container">
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" />
        </div>
        <div className="button-container">
          <button>PUBLISH</button>
        </div>
      </form>
    </div>
  );
};
