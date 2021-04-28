import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type BlogType = Omit<{ id: string }, "useParams"> & {
  id: Partial<{ id: number }>;
};

interface BlogProps {
  blog_id: number;
  blog_title: string;
  blog_author: string;
  blog_content: string;
}

export const Blog: React.FC = () => {
  const [id] = useState(useParams<BlogType>().id);
  const [blog, setBlog]: any = useState();

  const fetchBlog = async () => {
    const req = await axios.get(`http://localhost:3100/get/blog/${id}`);
    setBlog(req.data);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const blogDisplay = blog.map((blog: BlogProps) => {
    <article key={blog.blog_id}>
      <h1 className="blog-title">{blog.blog_title}</h1>

      <section>
        <p className="blog-content">{blog.blog_content}</p>
        <div className="section-footer">
          <div className="blog-options">
            <span>comment</span>
            <span>share</span>
            <span>edit </span>
          </div>
          <span className="blog-author">{blog.blog_author}</span>
        </div>
      </section>
    </article>;
  });

  return <>{blog ? blogDisplay : null}</>;
};
