import express from "express";
import cors from "cors";
import helmet from "helmet";
import { handleErrorMiddleware } from "./middleware/errorMiddleware";
import { config } from "./config";
import mongoose from "mongoose";
import { mainRouter } from "./router";
import { limiter } from "./utils/rateLimiter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

mongoose.connect(config.mongoUri);

mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Succesfull connection");
});

app.listen(config.port, () => console.log("Server started"));

app.use(mainRouter);

app.use(handleErrorMiddleware);
