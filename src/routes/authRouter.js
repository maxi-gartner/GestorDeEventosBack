import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.createUser);
authRouter.get("/login", authController.login);
authRouter.delete("/:id", authController.deleteUser);
authRouter.get("/:id", authController.getOneUser);
authRouter.get("/", authController.getUsers);

export default authRouter;
