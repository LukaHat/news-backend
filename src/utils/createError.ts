import { NextFunction } from "express";
import { GlobalError, StatusCodes } from "../types/apiTypes";

export const createError = (
  statusCode: StatusCodes,
  next: NextFunction,
  message?: string
) => {
  const error: GlobalError = new Error(message);
  error.statusCode = statusCode;
  next(error);
};
