const authService = {
  async createUser(data) {
    try {
      const user = await userSchema.create(data);
      return { success: true, data: user };
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

  async login(email, password) {
    try {
      const user = await userSchema.findOne({ email, password });
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error };
    }
  },
};

export default authService;
