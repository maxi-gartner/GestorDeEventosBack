export const authController = {
  login: (req, res) => {
    res.status(200).send("Logged in");
  },

  logout: (req, res) => {
    res.status(200).send("Logged out");
  },

  register: (req, res) => {
    res.status(200).send("Registered");
  },
};

export default authController;
