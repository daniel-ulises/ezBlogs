import express from "express";
import { addPost, getBlog, getBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post("/post/blog", addPost);
router.get("/get/blogs", getBlogs);
router.get("/get/blog/:id", getBlog);

export { router as blogRouter };
