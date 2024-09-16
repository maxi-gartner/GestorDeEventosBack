import userSchema from "../models/userSchema.js";
import responses from "./responses.js";

const authController = {
  async register(req, res) {
    try {
      const { name, lastname, email, password, age, genre, role } = req.body;
      const user = await userSchema.create({
        name,
        lastname,
        email,
        password,
        age,
        genre,
        role,
      });
      return responses.success(res, user, "User created");
    } catch (error) {
      return responses.error(res, error, "User not created");
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email, password });
      return responses.success(res, user, "User logged in");
    } catch (error) {
      return responses.error(res, error, "User not logged in");
    }
  },

  async getUsers(req, res) {
    try {
      const users = await userSchema.find();
      return responses.success(res, users, "Users retrieved");
    } catch (error) {
      return responses.error(res, error, "Users not retrieved");
    }
  },

  async getOneUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userSchema.findById(userId);
      if (!user) {
        return responses.error(res, null, "User not found");
      }
      return responses.success(res, user, "User retrieved");
    } catch (error) {
      return responses.error(res, error, "User not retrieved");
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userSchema.findByIdAndDelete(userId);
      if (!user) {
        return responses.error(res, null, "User not found");
      }
      return responses.success(res, user, "User deleted");
    } catch (error) {
      return responses.error(res, error, "User not deleted");
    }
  },
};

export default authController;
