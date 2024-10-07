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
import isAdmin from "../middlewares/isAdmin.js";

const authRouter = express.Router();

const consoleLog = (req, res, next) => {
  console.log("paso por aca");
  console.log("req.params", req.params);
  console.log("req.user", req.user);
  next();
};

authRouter.post(
  "/register",
  validator(registerSchema),
  authController.createUser
);

authRouter.post("/login", validator(loginSchema), authController.login);

authRouter.post(
  "/loginWithToken",
  passportAuthenticate,
  authController.loginWithToken
);

authRouter.post(
  "/changePassword",
  passportAuthenticate,
  isUser,
  authController.updatePassword
);

authRouter.delete("/:email", passportAuthenticate, authController.deleteUser);

authRouter.put(
  "/update",
  passportAuthenticate,
  isUser,
  authController.updateUser
);

authRouter.put(
  "/adminUpdateUser/:email",
  passportAuthenticate,
  isAdmin,
  authController.adminUpdateUser
);

authRouter.get("/:email", passportAuthenticate, authController.getOneUser);

authRouter.get("/", passportAuthenticate, authController.getUsers);

export default authRouter;
