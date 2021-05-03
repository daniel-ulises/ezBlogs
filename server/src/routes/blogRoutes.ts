import express from "express";
import { addPost, deleteBlog, getBlog, getBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post("/post/blog", addPost);
router.get("/get/blogs", getBlogs);
router.get("/get/blog/:id", getBlog);
router.delete("/delete/blog/:id", deleteBlog);

export { router as blogRouter };
