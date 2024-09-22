import express from "express";
import authController from "../controllers/authController.js";
import validator from "../validator/validator.js";
import authSchema from "../validator/schemas/authSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validator(authSchema), authController.createUser);
authRouter.get("/login", authController.login);
authRouter.delete("/:id", authController.deleteUser);
authRouter.get("/:id", authController.getOneUser);
authRouter.get("/", authController.getUsers);

export default authRouter;
