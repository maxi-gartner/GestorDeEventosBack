import express from "express";
import eventsController from "../controllers/eventsController.js";

const eventsRouter = express.Router();

eventsRouter.get("/get", eventsController.getEvents);
eventsRouter.get("/get/:id", eventsController.getOneEvent);
eventsRouter.post("/create", eventsController.createEvent);

export default eventsRouter;
