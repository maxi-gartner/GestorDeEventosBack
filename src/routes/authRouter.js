import express from "express";
import authController from "../controllers/authController.js";
import {
  registerSchema,
  loginSchema,
} from "../validator/schemas/authSchemaJoi.js";
import validator from "../validator/validator.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });
import isUser from "../middlewares/isUser.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validator(registerSchema),
  authController.createUser
);

authRouter.post("/login", validator(loginSchema), authController.login);

authRouter.delete("/:id", passportAuthenticate, authController.deleteUser);

authRouter.get("/:id", passportAuthenticate, authController.getOneUser);

authRouter.get("/", passportAuthenticate, authController.getUsers);

authRouter.put(
  "/update/:id",
  passportAuthenticate,
  isUser,
  authController.updateUser
);

authRouter.post(
  "/changePassword",
  passportAuthenticate,
  isUser,
  authController.updatePassword
);

export default authRouter;
