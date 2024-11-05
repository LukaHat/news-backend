import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI as string);

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
