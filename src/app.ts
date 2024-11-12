import express from "express";
import cors from "cors";
import helmet from "helmet";
import { handleErrorMiddleware } from "./middleware/errorMiddleware";
import { requireAuthentification } from "./middleware/requireAuthentification";
import { newsRouter } from "./routes/newsRoutes";
import { userRouter } from "./routes/userRoutes";
import { config } from "./config";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect(config.mongoUri);

mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Succesfull connection");
});

app.listen(config.port, () => console.log("Server started"));

app.use("/auth", userRouter);
app.use("/news", requireAuthentification, newsRouter);

app.use(handleErrorMiddleware);
