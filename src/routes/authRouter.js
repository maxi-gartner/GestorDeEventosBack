import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/register", authController.register);
authRouter.get("/login", authController.login);
authRouter.get("/logout", authController.logout);

export default authRouter;
