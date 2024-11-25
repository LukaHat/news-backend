import { NextFunction, Request, Response } from "express";
import {
  createComment as dbCreateComment,
  deleteComment as dbDeleteComment,
} from "../repositories/CommentRepository";
import { handleSuccess } from "../utils/handleResponse";
import { StatusCodes, UserRequest } from "../types/apiTypes";
import { createError } from "../utils/createError";

export const createComment = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName } = req.user;

    const commentData = { author: fullName, ...req.body };

    const data = await dbCreateComment(commentData);

    if (!data) throw createError(StatusCodes.InternalServerError, next);

    handleSuccess(res, StatusCodes.Created, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await dbDeleteComment(id);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    if (error.statusCode === StatusCodes.NotFound) {
      createError(error.statusCode, next, error.message as string);
    }
    createError(StatusCodes.InternalServerError, next);
  }
};
