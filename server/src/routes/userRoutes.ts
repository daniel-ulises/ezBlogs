import express from "express";
import { logout, auth, signin, signup } from "../controllers/userControllers";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/auth", auth);
router.get("/logout", logout);

export { router as userRouter };
