import { StatusCodesEnum } from "apiTypes";
import { Response } from "express";

export const handleSuccess = <T>(
  res: Response,
  statusCode: StatusCodesEnum,
  data?: T
) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

export const handleError = (
  res: Response,
  statusCode: StatusCodesEnum,
  message: string
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
