import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

const authService = {
  async createUser(data) {
    try {
      const email = await userSchema.findOne({ email: data.email });
      if (email) {
        return { success: false, error: "Email already exists" };
      }
      const passwordHash = bcrypt.hashSync(data.password || "", 10);
      data.password = passwordHash;
      const newUser = await userSchema.create(data);
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: error };
    }
  },
  async login(data) {
    try {
      const email = await userSchema.findOne({ email: data.email });
      if (!email) {
        return { success: false, error: "Email or password not found" };
      }
      if (!bcrypt.compareSync(data.password, email.password)) {
        return { success: false, error: "Email or password not found" };
      }
      return { success: true, data: email };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async getUsers() {
    try {
      const users = await userSchema.find();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async getOneUser(id) {
    try {
      const user = await userSchema.findById(id);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async deleteUser(id) {
    try {
      const user = await userSchema.findByIdAndDelete(id);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async updateUser(id, data) {
    try {
      const user = await userSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error };
    }
  },
};

export default authService;
