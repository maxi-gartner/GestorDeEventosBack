import authService from "../services/authService.js";
import responses from "./responses.js";

const authController = {
  async createUser(req, res) {
    const result = await authService.createUser(req.body);
    if (!result.success) {
      return responses.error(res, result.error, "User not created");
    }
    return responses.success(res, result.data, "User created");
  },

  async getUsers(req, res) {
    const result = await authService.getUsers();
    if (!result.success) {
      return responses.error(res, result.error, "Users not retrieved");
    }
    return responses.success(res, result.data, "Users retrieved");
  },
  async getOneUser(req, res) {
    const result = await authService.getOneUser(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "User not found");
    }
    return responses.success(res, result.data, "User retrieved");
  },
  async deleteUser(req, res) {
    const result = await authService.deleteUser(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "User not deleted");
    }
    return responses.success(res, result.data, "User deleted");
  },
  async login(req, res) {
    const result = await authService.login(req.body);
    if (!result.success) {
      return responses.error(res, result.error, "Login failed");
    }
    return responses.success(res, result.data, "Login successful");
  },

  async updateUser(req, res) {
    const result = await authService.updateUser(req.params.id, req.body);
    if (!result.success) {
      return responses.error(res, result.error, "User not updated");
    }
    return responses.success(res, result.data, "User updated");
  },
};

export default authController;
