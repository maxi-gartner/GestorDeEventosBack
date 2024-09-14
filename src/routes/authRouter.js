import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.get("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/users", authController.getUsers);

export default authRouter;
