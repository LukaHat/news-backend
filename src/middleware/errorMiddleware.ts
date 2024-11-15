import { handleError } from "../utils/handleResponse";
import { GlobalError, StatusCodesEnum } from "../types/apiTypes";
import { NextFunction, Request, Response } from "express";

export const handleErrorMiddleware = (
  error: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || StatusCodesEnum.InternalServerError;

  handleError(
    res,
    statusCode,
    error.message || "An unexpected error occurred. Please try again later"
  );
};
