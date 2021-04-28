import React, { useState, useEffect } from "react";
import { AddButton } from "../AddButton/AddButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserProps } from "src/App";

type BlogProps = {
  blog_id: number;
  blog_title: string;
  blog_author: string;
  blog_snippet: string;
};

export const Blogs: React.FC<UserProps> = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const req = await axios.get("http://localhost:3100/get/blogs");
    setBlogs(req.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogsDisplay = blogs.map((blog: BlogProps) => {
    return (
      <>
        {blogs ? (
          <article key={blog.blog_id}>
            <Link
              to={{
                pathname: `/blog/${blog.blog_id}`,
                state: blog.blog_id,
              }}
            >
              <h1 className="blog-title">{blog.blog_title}</h1>
            </Link>

            <section>
              <p className="blog-snippet">{blog.blog_snippet}</p>
              <div className="section-footer">
                <div className="blog-options">
                  <span>comment</span>
                  <span>share</span>
                  <span>edit </span>
                </div>
                <span className="blog-author">{blog.blog_author}</span>
              </div>
            </section>
          </article>
        ) : null}
        {user?.username ? <AddButton /> : null}
      </>
    );
  });

  return <div>{blogsDisplay}</div>;
};
