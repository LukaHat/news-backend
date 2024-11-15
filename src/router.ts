import express from "express";
import { userRouter } from "./routes/userRoutes";
import { newsRouter } from "./routes/newsRoutes";
import { requireAuthentication } from "./middleware/requireAuthentication";

export const mainRouter = express.Router();

mainRouter.use("/auth", userRouter);
mainRouter.use("/news", requireAuthentication, newsRouter);
