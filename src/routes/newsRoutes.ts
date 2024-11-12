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
import { handleAuthorization } from "../middleware/handleAuthorization";
import { Role } from "../types/userTypes";

const upload = multer({ dest: "uploads/" });

export const newsRouter = express.Router();

newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.delete("/:id", handleAuthorization([Role.ADMIN]), deleteNews);
newsRouter.patch(
  "/:id",
  upload.single("imageUrl"),
  handleAuthorization([Role.EDITOR, Role.ADMIN]),
  handleBreakingNews,
  updateNews
);
newsRouter.post(
  "/",
  upload.single("imageUrl"),
  handleAuthorization([Role.ADMIN, Role.EDITOR]),
  handleBreakingNews,
  createNews
);
