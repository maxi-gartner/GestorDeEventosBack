import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";

const isOrganizer = async (req, res, next) => {
  try {
    //console.log("req.user", req.user);
    if (req.user.role !== "organizer") {
      throw new CustomErrors("You are not an organizer", 403);
    }
    //console.log("es organizador");
    next();
  } catch (error) {
    next(error);
  }
};

export default isOrganizer;
