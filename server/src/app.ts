import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { blogRouter } from "./routes/blogRoutes";

// Initializing app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use(userRouter);
app.use(blogRouter);

export default app;
