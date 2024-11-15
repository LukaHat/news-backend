import { NextFunction, Request, Response } from "express";
import {
  login as dbLogin,
  register as dbRegister,
  findByEmail,
} from "../repositories/UserRepository";
import { StatusCodes } from "../types/apiTypes";
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
      createError(StatusCodes.NotFound, next, "User not registered");
    }

    if (!user) {
      createError(StatusCodes.BadRequest, next, "Invalid email or password");
    }

    const userResponse = createUserResponse(user);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodes.OK, {
      token,
      user: userResponse,
    });
  } catch (error) {
    createError(
      StatusCodes.InternalServerError,
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
      createError(StatusCodes.BadRequest, next, "Email already taken");
    }

    const newUser = await dbRegister(req.body);

    if (!newUser) throw createError(StatusCodes.InternalServerError, next);

    const userResponse = createUserResponse(newUser);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodes.Created, { token, user: userResponse });
  } catch (error) {
    createError(
      StatusCodes.InternalServerError,
      next,
      "Something went wrong. Please try again later..."
    );
  }
};
