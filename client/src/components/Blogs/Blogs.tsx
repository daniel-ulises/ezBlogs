import React, { useState, useEffect } from "react";
import { AddButton } from "../AddButton/AddButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserProps } from "src/App";

type BlogProps = {
  id: number;
  title: string;
  author: string;
  description: string;
};

export const Blogs: React.FC<UserProps> = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const req = await axios.get("/get/blogs");
    setBlogs(req.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/delete/blog/${id}`);
    const filtered = blogs.filter((blog: BlogProps) => id != blog.id);
    setBlogs!(filtered);
  };

  const blogsDisplay = blogs.map((blog: BlogProps) => {
    return (
      <>
        {blogs ? (
          <article key={blog.id}>
            <Link
              to={{
                pathname: `/blog/${blog.id}`,
                state: blog.id,
              }}
            >
              <h1 className="blog-title">{blog.title}</h1>
            </Link>

            <section>
              <p className="blog-snippet">{blog.description}</p>
              <div className="section-footer">
                <div className="blog-options">
                  <span>comment</span>
                  <span>share</span>
                  {user?.username === blog.author ? <span>edit</span> : null}
                  {user?.username === blog.author ? (
                    <span onClick={() => handleDelete(blog.id)}>delete</span>
                  ) : null}
                </div>
                <span className="blog-author">{blog.author}</span>
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
