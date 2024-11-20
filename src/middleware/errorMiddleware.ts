import { handleError } from "../utils/handleResponse";
import { GlobalError, StatusCodes } from "../types/apiTypes";
import { NextFunction, Request, Response } from "express";

export const handleErrorMiddleware = (
  error: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || StatusCodes.InternalServerError;

  handleError(
    res,
    statusCode,
    error.message || "An unexpected error occurred. Please try again later"
  );
};
