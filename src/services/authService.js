import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import CustomErrors from "../utils/customError.js";
import mongoose from "mongoose";

const authService = {
  async getUserByEmail(email) {
    return await userSchema.findOne({ email }).populate("events");
  },

  async checkPassword(password, hashPassword) {
    return bcrypt.compareSync(password || "", hashPassword);
  },

  async createUser(data) {
    try {
      const passwordHash = bcrypt.hashSync(data.password || "", 10);
      data.password = passwordHash;
      const newUser = await userSchema.create(data);
      return { success: true, data: newUser };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to create user", 400);
    }
  },

  async getUsers() {
    try {
      const users = await userSchema.find();
      return { success: true, data: users };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve users", 400);
    }
  },

  async getOneUser(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomErrors("Invalid user ID format", 400);
      }

      const user = await userSchema.findById(id);
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }

      return { success: true, data: user };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve user", 400);
    }
  },

  async deleteUser(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomErrors("Invalid user ID format", 400);
      }

      const user = await userSchema.findByIdAndDelete(id);
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }

      return { success: true, data: user };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to delete user", 400);
    }
  },

  async updateUser(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomErrors("Invalid user ID format", 400);
      }

      const user = await userSchema.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }

      return { success: true, data: user };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to update user", 400);
    }
  },

  async searchUserById(id) {
    console.log("objectId", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomErrors("Invalid user ID format", 400);
    }
    return await userSchema.findById(id);
  },

  async updatePassword(id, password) {
    try {
      const passwordHash = bcrypt.hashSync(password, 10);
      const user = await userSchema.findByIdAndUpdate(
        id,
        { password: passwordHash },
        { new: true }
      );
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }
      return { success: true, data: user };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to update password", 400);
    }
  },
};

export default authService;
