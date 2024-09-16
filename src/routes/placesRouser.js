import express from "express";
import placesController from "../controllers/placesController.js";

const placesRouter = express.Router();

placesRouter.post("/create", placesController.createPlace);
placesRouter.get("/get/:id", placesController.getOnePlace);
placesRouter.delete("/delete/:id", placesController.deletePlace);
placesRouter.get("/", placesController.getPlaces);

export default placesRouter;
