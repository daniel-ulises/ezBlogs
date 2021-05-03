import { Request, Response } from "express";
import { Posts } from "../entities/Posts";

export const addPost = async (req: Request, res: Response) => {
  try {
    const { author, title, description, content } = req.body;
    const post = await Posts.create({ author, title, description, content });
    await Posts.save(post);

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const getBlogs = async (_: any, res: Response) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Posts.findOne(id);
    console.log(post);
    res.json(post);
  } catch (err) {}
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Posts.delete(id);

    if (post.affected !== 0 || undefined) {
      console.log(post);
      res.status(200).json({
        message: "Post found and deleted successfully.",
      });
    } else {
      res.json({
        message: "Post not foud, nothing deleted.",
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
