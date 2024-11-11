import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { newsRouter } from "./routes/newsRoutes";
import { userRouter } from "./routes/userRoutes";
import helmet from "helmet";
import { reqAuthentification } from "./middleware/reqAuthentification";
import { handleErrorMiddleware } from "./middleware/errorMiddleware";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri.length) {
  console.error("Mongo Uri was not defined");
  process.exit(1);
}

mongoose.connect(mongoUri);

mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Succesfull connection");
});

const port = 8000;

app.listen(port, () => console.log("Server started"));

app.use("/auth", userRouter);
app.use("/news", reqAuthentification, newsRouter);

app.use(handleErrorMiddleware);
