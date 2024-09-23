import express from "express";
import placesController from "../controllers/placesController.js";
import validator from "../validator/validator.js";
import placeSchema from "../validator/schemas/placeSchemaJoi.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });

const placesRouter = express.Router();

placesRouter.post(
  "/create",
  validator(placeSchema),
  placesController.createPlace
);
placesRouter.get("/:id", passportAuthenticate, placesController.getOnePlace);
placesRouter.delete("/:id", passportAuthenticate, placesController.deletePlace);
placesRouter.get("/", passportAuthenticate, placesController.getPlaces);

export default placesRouter;
