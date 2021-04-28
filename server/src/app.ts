import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { userRouter } from "./routes/userRoutes";
import { blogRouter } from "./routes/blogRoutes";

// Initializing app
const app = express();
const PUBLIC = path.join(__dirname, "../../client/build");

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
app.use(express.static(PUBLIC));
app.use(userRouter);
app.use(blogRouter);
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../../", "client", "build", "index.html"));
});

export default app;
