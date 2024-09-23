import express from "express";
import eventsController from "../controllers/eventsController.js";
import validator from "../validator/validator.js";
import eventSchema from "../validator/schemas/eventSchemaJoi.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });

const eventsRouter = express.Router();

eventsRouter.post(
  "/create",
  validator(eventSchema),
  eventsController.createEvent
);
eventsRouter.get("/:id", passportAuthenticate, eventsController.getOneEvent);
eventsRouter.get("/", passportAuthenticate, eventsController.getEvents);
eventsRouter.delete("/:id", passportAuthenticate, eventsController.deleteEvent);
eventsRouter.post(
  "/register/:userId/:eventId",
  passportAuthenticate,
  eventsController.registerToEvent
);

export default eventsRouter;
