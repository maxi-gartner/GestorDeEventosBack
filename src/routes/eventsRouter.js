import express from "express";
import eventsController from "../controllers/eventsController.js";
import validator from "../validator/validator.js";
import eventSchema from "../validator/schemas/eventSchemaJoi.js";

const eventsRouter = express.Router();

eventsRouter.post(
  "/create",
  validator(eventSchema),
  eventsController.createEvent
);
eventsRouter.get("/:id", eventsController.getOneEvent);
eventsRouter.get("/", eventsController.getEvents);
eventsRouter.delete("/:id", eventsController.deleteEvent);
eventsRouter.post(
  "/register/:userId/:eventId",
  eventsController.registerToEvent
);

export default eventsRouter;
