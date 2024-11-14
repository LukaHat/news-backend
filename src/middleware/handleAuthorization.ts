import { NextFunction, Response } from "express";
import { UserRequest, StatusCodes } from "../types/apiTypes";
import { RoleEnum } from "../types/userTypes";
import { createError } from "../utils/createError";

export const handleAuthorization = (requiredRoles: RoleEnum[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
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
