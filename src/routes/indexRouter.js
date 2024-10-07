import express from "express";
import authRouter from "./authRouter.js";
import placesRouter from "./placesRouter.js";
import eventsRouter from "./eventsRouter.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/place", placesRouter);
indexRouter.use("/event", eventsRouter);

export default indexRouter;
