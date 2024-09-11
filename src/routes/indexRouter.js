import express from "express";
import authRouter from "./authRouter.js";
import placesRouter from "./placesRouser.js";
import eventsRouter from "./eventsRouter.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/places", placesRouter);
indexRouter.use("/events", eventsRouter);

export default indexRouter;
