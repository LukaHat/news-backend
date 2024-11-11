import express from "express";
import {
  getAllNews,
  createNews,
  deleteNews,
  getNewsById,
  updateNews,
} from "../controllers/NewsController";
import multer from "multer";
import { handleBreakingNews } from "../middleware/breakingNewsMiddleware";

const upload = multer({ dest: "uploads/" });

export const newsRouter = express.Router();

newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.delete("/:id", deleteNews);
newsRouter.patch(
  "/:id",
  upload.single("imageUrl"),
  handleBreakingNews,
  updateNews
);
newsRouter.post("/", upload.single("imageUrl"), handleBreakingNews, createNews);
