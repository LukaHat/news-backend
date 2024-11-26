import express from "express";
import {
  getAllNews,
  createNews,
  deleteNews,
  getNewsById,
  updateNews,
  populateNews,
} from "../controllers/NewsController";
import multer from "multer";
import { handleBreakingNews } from "../middleware/breakingNewsMiddleware";
import { handleAuthorization } from "../middleware/handleAuthorization";
import { RoleEnum } from "../types/userTypes";

const upload = multer({ dest: "uploads/" });

export const newsRouter = express.Router();

newsRouter.get("/", getAllNews);
newsRouter.get("/populate/:query", populateNews);
newsRouter.get("/:id", getNewsById);
newsRouter.delete("/:id", handleAuthorization([RoleEnum.ADMIN]), deleteNews);
newsRouter.patch(
  "/:id",
  upload.single("imageUrl"),
  handleAuthorization([RoleEnum.EDITOR, RoleEnum.ADMIN]),
  handleBreakingNews,
  updateNews
);
newsRouter.post(
  "/",
  upload.single("imageUrl"),
  handleAuthorization([RoleEnum.ADMIN, RoleEnum.EDITOR]),
  handleBreakingNews,
  createNews
);
