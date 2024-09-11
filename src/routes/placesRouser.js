import express from "express";
import placesController from "../controllers/placesController.js";

const placesRouter = express.Router();

placesRouter.get("/get", placesController.getPlaces);
placesRouter.get("/get/:id", placesController.getOnePlace);
placesRouter.post("/create", placesController.createPlace);
placesRouter.put("/update/:id", placesController.updatePlace);
placesRouter.delete("/delete/:id", placesController.deletePlace);

export default placesRouter;
