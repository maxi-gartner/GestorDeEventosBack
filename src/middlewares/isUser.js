import authService from "../services/authService.js";

const isUser = async (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      throw new CustomErrors("You are not an user", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isUser;
