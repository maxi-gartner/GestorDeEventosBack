import CustomErrors from "../utils/customError.js";

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomErrors("You are not an admin", 403);
  }
  next();
};

export default isAdmin;
