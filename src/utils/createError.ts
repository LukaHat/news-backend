import { NextFunction } from "express";
import { GlobalError, StatusCodesEnum } from "../types/apiTypes";

export const createError = (
  statusCode: StatusCodesEnum,
  next: NextFunction,
  message?: string
) => {
  const error: GlobalError = new Error(message);
  error.statusCode = statusCode;
  next(error);
};
