import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UserProps } from "../../App";

export type BlogFormInput = {
  preventDefault: () => void;
  target: {
    title: { value: string };
    description: { value: string };
    content: { value: string | number };
    reset: () => void;
  };
};

export const AddBlog: React.FC<UserProps> = ({ user }) => {
  const [message, setMessage]: any = useState([]);
  const handleSubmit = async (e: BlogFormInput & FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = await axios.post("/post/blog", {
      title: e.target.title.value,
      description: e.target.description.value,
      author: user?.username,
      content: e.target.content.value,
    });

    setMessage(req.data);
    e.target.reset();
  };

  return (
    <div className="create-blog">
      <div className="addblog-navigation">
        <ul>
          <li>
            <Link to="/" onClick={() => setMessage()}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={() => setMessage()}>
              BLOGS
            </Link>
          </li>
          {message.id ? (
            <li className="submit-message">
              Post created successfully, check it out{" "}
              <Link onClick={() => setMessage()} to={`/blog/${message.id}`}>
                here!
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-title-snippet">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="description">Snippet</label>
            <span className="snippet">Give a short description of the blog itself</span>
            <input type="text" name="description" id="description" />
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
