import { NextFunction, Response } from "express";
import { RequestWithUser, StatusCodes } from "../types/apiTypes";
import { Role } from "../types/userTypes";
import { createError } from "../utils/createError";

export const handleAuthorization = (requiredRoles: Role[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { role } = req.user;

    const isAuthorized = requiredRoles.includes(role);

    if (!isAuthorized) {
      createError(
        StatusCodes.Forbidden,
        next,
        "Not authorized to make this request"
      );

      next();
    }

    next();
  };
};
