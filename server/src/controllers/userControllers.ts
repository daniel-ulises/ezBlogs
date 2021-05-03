import { Request, Response } from "express";
import { Users } from "../entities/Users";
import argon2 from "argon2";
import { validate } from "class-validator";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { COOKIE_NAME } from "../constants";

const createToken = (id: number) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: "3days",
  });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = new Users();

    // defining the Users properties
    user.email = email;
    user.username = username;
    user.password = password;

    // Validate the input
    const errors = await validate(user);

    // Check if there are any errors. If yes, send them back.
    if (errors.length > 0) {
      console.log(errors);
      res.json({
        message: {
          email: errors[0].constraints?.isEmail,
          password: errors[0].constraints?.minLength,
        },
      });
      return;
    } else {
      // Change the password to the hashed one after validation
      user.password = hashedPassword;

      // Save the created user into the database
      await user.save();

      // Create token
      const token = createToken(user.id);

      // Create cookie & send the username back as the response for the front end.
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3 * 1000, // 3 days in milliseconds
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (err) {
    //   Check if email or username already exist, then send response.
    if (err.code === "23505" && err.detail.includes("email")) {
      res.json({ message: { email: "Email already exists" } });
    } else if (err.code === "23505" && err.detail.includes("username")) {
      res.json({ message: { username: "Username already exists" } });
    }
    console.log(err);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      res.json({ message: { email: "email does not exist" } });
      return;
    }

    const valid = await argon2.verify(user!.password, password);

    if (!valid) {
      res.json({ message: { password: "Password does not match" } });
      return;
    }

    const token = createToken(user.id);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000, // 3 days in milliseconds
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const auth = (req: Request, res: Response) => {
  const cookie = req.cookies.ezblog;

  if (cookie) {
    jwt.verify(
      cookie,
      String(process.env.JWT_SECRET),
      async (err: VerifyErrors | null, decoded: object | any) => {
        if (err) {
          console.log(err);
        } else {
          const user = await Users.findOne(decoded.id);
          res.send({
            id: user?.id,
            username: user?.username,
          });
        }
      }
    );
  } else {
    res.send("No cookie available");
  }
};

export const logout = (_: any, res: Response) => {
  res.cookie(COOKIE_NAME, "", { maxAge: 1, httpOnly: true });
  res.send("Logged out");
};
