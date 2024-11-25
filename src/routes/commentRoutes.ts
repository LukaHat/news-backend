import express from "express";
import { createComment, deleteComment } from "../controllers/CommentController";
import { handleAuthorization } from "../middleware/handleAuthorization";
import { RoleEnum } from "../types/userTypes";

export const commentRouter = express.Router();

commentRouter.post("/", handleAuthorization([RoleEnum.ADMIN]), createComment);
commentRouter.delete(
  "/:id",
  handleAuthorization([RoleEnum.ADMIN]),
  deleteComment
);
