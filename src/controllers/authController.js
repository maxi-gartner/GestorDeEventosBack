import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";
import httResponse from "../utils/httResponse.js";
import catched from "../utils/catched.js";
import userDTO from "../DTO/userDTO.js";
import jwt from "jsonwebtoken";

const authController = {
  async createUser(req, res) {
    const data = req.body;
    const emailInDb = await authService.getUserByEmail(data.email);
    if (emailInDb) throw new CustomErrors("Email already in use", 400);
    const result = await authService.createUser(data);
    const token = jwt.sign({ email: result.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const responseFiltered = userDTO(result.data, token);
    httResponse(res, responseFiltered, "User created", 200);
  },

  async login(req, res) {
    const data = req.body;
    const emailInDb = await authService.getUserByEmail(data.email);
    if (!emailInDb) throw new CustomErrors("Email not found", 401);
    const validPassword = await authService.checkPassword(
      data.password,
      emailInDb.password
    );
    if (!validPassword) throw new CustomErrors("Invalid password", 401);
    const token = jwt.sign(
      { email: emailInDb.email },
      process.env.JWT_SECRET /* , { expiresIn: "3h" } */
    );
    const responseFiltered = userDTO(emailInDb, token);
    httResponse(res, responseFiltered, "User logged in", 200);
  },

  async loginWithToken(req, res) {
    const user = req.user;
    const userFiltered = userDTO(user);
    httResponse(res, userFiltered, "User logged in", 200);
  },

  async getOneUser(req, res) {
    try {
      const { email } = req.params;
      const result = await authService.getUserByEmail(email);
      if (result) {
        const responseFiltered = userDTO(result);
        httResponse(res, responseFiltered, "User retrieved", 200);
      } else if (!result) {
        throw new CustomErrors("User not found", 400);
      } else {
        throw new CustomErrors("User not found", 404);
      }
    } catch (error) {
      throw new CustomErrors(error.message || "User not found", 404);
    }
  },

  async getUsers(req, res) {
    const result = await authService.getUsers();
    if (!result.success) {
      throw new CustomErrors(result.error, 400);
    }
    const users = result.data;
    const responseFiltered = users.map(userDTO);
    httResponse(res, responseFiltered, "Users retrieved", 200);
  },

  async deleteUser(req, res) {
    const { email } = req.params;
    const user = await authService.getUserByEmail(email);
    const result = await authService.deleteUser(user._id);
    if (result.success === true) {
      const newUsers = await authService.getUsers();
      const responseFiltered = newUsers.data.map(userDTO);
      httResponse(res, responseFiltered, "User deleted", 200);
    } else {
      throw new CustomErrors(result.error, 400);
    }
  },

  async updateUser(req, res) {
    try {
      const response = await authService.updateUser(req.user._id, req.body);
      const responseFiltered = userDTO(response.data);
      httResponse(res, responseFiltered, "User updated", 200);
    } catch {
      throw new CustomErrors("Invalid user ID format", 400);
    }
  },

  async updatePassword(req, res) {
    try {
      const id = req.user._id;
      const { newPassword, confirmPassword, oldPassword } = req.body;

      if (newPassword !== confirmPassword) {
        throw new CustomErrors("Passwords do not match", 400);
      }
      const user = await authService.searchUserById(id);
      const validPassword = await authService.checkPassword(
        oldPassword,
        user.password
      );
      if (!validPassword) {
        throw new CustomErrors("Invalid passwordssss", 400);
      }
      const result = await authService.updatePassword(id, newPassword);
      if (!result.success) {
        throw new CustomErrors(result.error, 400);
      }
      const responseFiltered = userDTO(result.data);
      httResponse(res, responseFiltered, "Password updated", 200);
    } catch {
      throw new CustomErrors("Invalid password", 400);
    }
  },

  async adminUpdateUser(req, res) {
    try {
      const email = req.params.email;
      console.log("email", email);
      const user = await authService.getUserByEmail(email);
      console.log("user", user);
      const response = await authService.updateUser(user._id, req.body);
      if (response.success === true) {
        const allUsers = await authService.getUsers();
        const responseFiltered = allUsers.data.map(userDTO);
        httResponse(res, responseFiltered, "User updated", 200);
      }
    } catch {
      throw new CustomErrors("Invalid user ID format", 400);
    }
  },
};

export default {
  createUser: catched(authController.createUser),
  login: catched(authController.login),
  getUsers: catched(authController.getUsers),
  getOneUser: catched(authController.getOneUser),
  deleteUser: catched(authController.deleteUser),
  updateUser: catched(authController.updateUser),
  updatePassword: catched(authController.updatePassword),
  loginWithToken: catched(authController.loginWithToken),
  adminUpdateUser: catched(authController.adminUpdateUser),
};
