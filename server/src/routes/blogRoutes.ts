import express from "express";
import { addPost } from "../controllers/blogControllers";

const router = express.Router();

router.post("/post/blog", addPost);

export { router as blogRouter };
