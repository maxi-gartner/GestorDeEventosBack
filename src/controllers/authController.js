import userSchema from "../models/userSchema.js";

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
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email, password });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req, res) {
    try {
      res.status(200).send("Logout");
    } catch (error) {
      console.log(error);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await userSchema.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },
};

export default authController;
