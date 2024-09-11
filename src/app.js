import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

import indexRouter from "./routes/indexRouter.js";

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.listen(process.env.PORT, () =>
  console.log("Listening on port", process.env.PORT)
);

server.use("/api", indexRouter);
server.get("/", (req, res) => {
  res.send("Hello World!");
});
