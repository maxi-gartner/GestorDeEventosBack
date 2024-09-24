import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";

const isOrganizer = async (req, res, next) => {
  try {
    const orgnizer = await authService.getOneUser(req.body.organizer);
    //console.log("orgnizer", orgnizer);

    if (orgnizer.data.role !== "organizer") {
      throw new CustomErrors("You are not an admin", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isOrganizer;
