import express from "express";
import authController from "../controllers/authController.js";
import {
  registerSchema,
  loginSchema,
} from "../validator/schemas/authSchemaJoi.js";
import validator from "../validator/validator.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });
import isAdmin from "../middlewares/isAdmin.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validator(registerSchema),
  authController.createUser
);

authRouter.get("/login", validator(loginSchema), authController.login);

authRouter.delete("/:id", passportAuthenticate, authController.deleteUser);

authRouter.get("/:id", passportAuthenticate, authController.getOneUser);

authRouter.get("/", passportAuthenticate, authController.getUsers);

export default authRouter;
