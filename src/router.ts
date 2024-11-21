import express from "express";
import { userRouter } from "./routes/userRoutes";
import { newsRouter } from "./routes/newsRoutes";
import { commentRouter } from "./routes/commentRoutes";
import { requireAuthentication } from "./middleware/requireAuthentication";

export const mainRouter = express.Router();

mainRouter.use("/auth", userRouter);
mainRouter.use("/news", requireAuthentication, newsRouter);
mainRouter.use("/comments", requireAuthentication, commentRouter);
