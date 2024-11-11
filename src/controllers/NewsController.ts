import { NextFunction, Request, Response } from "express";
import {
  createNews as dbCreateNews,
  deleteNews as dbDeleteNews,
  getAllNews as dbGetAllNews,
  getNewsById as dbGetNewsById,
  updateNews as dbUpdateNews,
} from "../repositories/NewsRepository.ts";
import { StatusCodes } from "../types/apiTypes.ts";
import { Role } from "../types/userTypes.ts";
import { handleSuccess } from "../utils/handleResponse.ts";
import { reqGuard } from "../utils/reqGuard.ts";
import { createError } from "../utils/createError.ts";

export const createNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;

    reqGuard(res, [Role.ADMIN, Role.EDITOR], role);

    if (!req.file) {
      return createError(
        StatusCodes.BadRequest,
        next,
        "Bad request! You need to provide the image"
      );
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const newsData = { ...req.body, imageUrl };

    const data = await dbCreateNews(newsData);

    handleSuccess(res, StatusCodes.Created, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    const { id } = req.params;

    reqGuard(res, [Role.ADMIN], role);

    const data = await dbDeleteNews(id);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dbGetAllNews();

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const getNewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await dbGetNewsById(id);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const updateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    const { id } = req.params;

    reqGuard(res, [Role.EDITOR, Role.ADMIN], role);

    const updateData = { ...req.body };

    const data = await dbUpdateNews(id, updateData);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};
