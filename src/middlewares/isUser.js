import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";

const isUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomErrors("User not authenticated", 401);
    }
    if (req.user.role !== "user") {
      throw new CustomErrors("You are not a user", 403);
    }

    next(); // Si el usuario es válido, continúa
  } catch (error) {
    next(error); // Pasa el error al manejador de errores
  }
};

export default isUser;
