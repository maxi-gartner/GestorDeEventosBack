import express from "express";
import authController from "../controllers/authController.js";
import validator from "../validator/validator.js";
import {
  registerSchema,
  loginSchema,
} from "../validator/schemas/authSchemaJoi.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validator(registerSchema),
  authController.createUser
);
authRouter.get("/login", validator(loginSchema), authController.login);
authRouter.delete("/:id", authController.deleteUser);
authRouter.get("/:id", authController.getOneUser);
authRouter.get("/", authController.getUsers);

export default authRouter;
