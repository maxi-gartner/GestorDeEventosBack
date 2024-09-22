import express from "express";
import placesController from "../controllers/placesController.js";
import validator from "../validator/validator.js";
import placeSchema from "../validator/schemas/placeSchemaJoi.js";

const placesRouter = express.Router();

placesRouter.post(
  "/create",
  validator(placeSchema),
  placesController.createPlace
);
placesRouter.get("/:id", placesController.getOnePlace);
placesRouter.delete("/:id", placesController.deletePlace);
placesRouter.get("/", placesController.getPlaces);

export default placesRouter;
