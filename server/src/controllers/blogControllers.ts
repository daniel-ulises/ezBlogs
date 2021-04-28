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
