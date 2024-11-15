import { StatusCodes } from "apiTypes";
import { Response } from "express";

export const handleSuccess = <T>(
  res: Response,
  statusCode: StatusCodes,
  data?: T
) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

export const handleError = (
  res: Response,
  statusCode: StatusCodes,
  message: string
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
