import authService from "../services/authService.js";
import responses from "./responses.js";

const authController = {
  async createUser(req, res) {
    const data = req.body;
    const emailInDb = await authService.getUserByEmail(data.email);
    if (!emailInDb) {
      return responses.error(res, "Email already exists", "User not created");
    }
    const result = await authService.createUser(req.body);
    if (!result.success) {
      return responses.error(res, result.error, "User not created");
    }
    return responses.success(res, result.data, "User created");
  },
  async login(req, res) {
    const data = req.body;
    const emailInDb = await authService.getUserByEmail(data.email);
    if (!emailInDb) {
      return responses.error(
        res,
        "Email or password not found",
        "User not logged in"
      );
    }
    const validPassword = authService.checkPassword(
      data.password,
      emailInDb.password
    );
    if (!validPassword) {
      return responses.error(
        res,
        "Email or password not found",
        "User not logged in"
      );
    }
    return responses.success(res, emailInDb, "User logged in");
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

  async updateUser(req, res) {
    const result = await authService.updateUser(req.params.id, req.body);
    if (!result.success) {
      return responses.error(res, result.error, "User not updated");
    }
    return responses.success(res, result.data, "User updated");
  },
};

export default authController;
