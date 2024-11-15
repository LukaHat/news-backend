import { NextFunction, Request, Response } from "express";
import {
  login as dbLogin,
  register as dbRegister,
  findByEmail,
} from "../repositories/UserRepository";
import { StatusCodesEnum } from "../types/apiTypes";
import { createError } from "../utils/createError";
import { createUserResponse } from "../utils/createUserResponse";
import { handleJwt } from "../utils/handleJwt";
import { handleSuccess } from "../utils/handleResponse";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await dbLogin(req.body);
    const validateUser = await findByEmail(req.body.email);

    if (!validateUser) {
      createError(StatusCodesEnum.NotFound, next, "User not registered");
    }

    if (!user) {
      createError(
        StatusCodesEnum.BadRequest,
        next,
        "Invalid email or password"
      );
    }

    const userResponse = createUserResponse(user);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodesEnum.OK, {
      token,
      user: userResponse,
    });
  } catch (error) {
    createError(
      StatusCodesEnum.InternalServerError,
      next,
      "Something went wrong. Please try again later..."
    );
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailTaken = await findByEmail(req.body.email);

    if (emailTaken) {
      createError(StatusCodesEnum.BadRequest, next, "Email already taken");
    }

    const newUser = await dbRegister(req.body);

    if (!newUser) throw createError(StatusCodesEnum.InternalServerError, next);

    const userResponse = createUserResponse(newUser);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodesEnum.Created, { token, user: userResponse });
  } catch (error) {
    createError(
      StatusCodesEnum.InternalServerError,
      next,
      "Something went wrong. Please try again later..."
    );
  }
};
