import express from "express";
import placesController from "../controllers/placesController.js";
import validator from "../validator/validator.js";
import placeSchema from "../validator/schemas/placeSchemaJoi.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });
import isAdmin from "../middlewares/isAdmin.js";

const placesRouter = express.Router();
const consoleLog = (req, res, next) => {
  console.log("paso por aca");
  console.log("req.params", req.params);
  console.log("req.user", req.user);
  next();
};

placesRouter.post(
  "/create",
  validator(placeSchema),
  passportAuthenticate,
  isAdmin,
  placesController.createPlace
);
placesRouter.get("/:id", passportAuthenticate, placesController.getOnePlace);
placesRouter.delete("/:id", passportAuthenticate, placesController.deletePlace);
placesRouter.get("/", consoleLog, placesController.getPlaces);

export default placesRouter;
