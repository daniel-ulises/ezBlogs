import React from "react";
import { Link } from "react-router-dom";

export const AddButton: React.FC = () => {
  return (
    <Link to="/addblog">
      <div className="add-blog-container">
        <div className="plus-sign-1"></div>
        <div className="plus-sign-2"></div>
      </div>
    </Link>
  );
};
