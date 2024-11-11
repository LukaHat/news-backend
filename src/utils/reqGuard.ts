import { StatusCodes } from "../types/apiTypes";
import { Role } from "../types/userTypes";
import { handleError } from "./handleResponse";
import { Response } from "express";

export const reqGuard = (
  res: Response,
  requiredRoles: Role[],
  passedInRole: Role
) => {
  const isAuthorized = requiredRoles.includes(passedInRole);

  if (!isAuthorized) {
    handleError(
      res,
      StatusCodes.Forbidden,
      "Not authorized to make this request"
    );
  }
};
