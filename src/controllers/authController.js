import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";
import httResponse from "../utils/httResponse.js";
import mongoose from "mongoose";
import catched from "../utils/catched.js";
import userDTO from "../DTO/userDTO.js";
import jwt from "jsonwebtoken";

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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
    const validPassword = authService.checkPassword(
      data.password,
      emailInDb.password
    );
    if (!validPassword) throw new CustomErrors("Invalid password", 401);
    const token = jwt.sign({ email: emailInDb.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const responseFiltered = userDTO(emailInDb, token);
    httResponse(res, responseFiltered, "User logged in", 200);
  },

  async getUsers(req, res) {
    const result = await authService.getUsers();
    const responseFiltered = result.map(userDTO);
    httResponse(res, responseFiltered, "Users retrieved", 200);
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
    const { id } = req.params;
    if (!validateObjectId(id))
      throw new CustomErrors("Invalid user ID format", 400);
    const result = await authService.deleteUser(id);
    if (!result.success) throw new CustomErrors(result.error, 400);
    httResponse(res, result.data, "User deleted", 200);
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const authenticatedUser = req.user;
    const { password, ...updateFields } = req.body;

    if (authenticatedUser.role !== "admin") {
      if (req.body.role) {
        throw new CustomErrors("Users cannot update their role", 400);
      }
      if (password) {
        throw new CustomErrors(
          "Password must be updated via the password change endpoint",
          400
        );
      }
    }

    if (authenticatedUser.role === "admin") {
      if (password) {
        throw new CustomErrors(
          "Password must be updated via the password change endpoint",
          400
        );
      }
    }

    const result = await authService.updateUser(id, updateFields);

    if (!result.success) {
      throw new CustomErrors(result.error, 400);
    }
    const responseFiltered = userDTO(result.data);
    httResponse(res, responseFiltered, "User updated", 200);
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
};

export default {
  createUser: catched(authController.createUser),
  login: catched(authController.login),
  getUsers: catched(authController.getUsers),
  getOneUser: catched(authController.getOneUser),
  deleteUser: catched(authController.deleteUser),
  updateUser: catched(authController.updateUser),
  updatePassword: catched(authController.updatePassword),
};
