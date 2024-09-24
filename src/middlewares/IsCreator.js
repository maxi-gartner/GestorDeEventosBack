import CustomErrors from "../utils/customError.js";
import eventSchema from "../models/eventSchema.js";
import authService from "../services/authService.js";

const isCreator = async (req, res, next) => {
  try {
    const user = await authService.getUserByEmail(req.user.email);
    //console.log("user._id", user._id);
    const event = await eventSchema.findById(req.params.id);
    //console.log("event.organizer", event.organizer);

    if (!event) {
      throw new CustomErrors("Event not found", 404);
    }

    if (!user._id.equals(event.organizer)) {
      throw new CustomErrors("You are not the creator", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isCreator;
