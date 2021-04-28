import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type BlogType = Omit<{ id: string }, "useParams"> & {
  id: Partial<{ id: number }>;
};

// interface BlogProps {
//   id: number;
//   title: string;
//   author: string;
//   content: string;
// }

export const Blog: React.FC = () => {
  const [id] = useState(useParams<BlogType>().id);
  const [blog, setBlog]: any = useState();

  const fetchBlog = async () => {
    const req = await axios.get(`/get/blog/${id}`);
    setBlog(req.data);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <>
      {blog ? (
        <article key={blog.id}>
          <h1 className="blog-title">{blog.title}</h1>

          <section>
            <p className="blog-content">{blog.content}</p>
            <div className="section-footer">
              <div className="blog-options">
                <span>comment</span>
                <span>share</span>
                <span>edit </span>
              </div>
              <span className="blog-author">{blog.author}</span>
            </div>
          </section>
        </article>
      ) : null}
    </>
  );
};
