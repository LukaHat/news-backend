import { Request, Response } from "express";
import {
  login as dbLogin,
  register as dbRegister,
  findByEmail,
} from "../repositories/UserRepository";
import { createUserResponse } from "../utils/createUserResponse";
import { handleJwt } from "../utils/handleJwt";
import { handleError, handleSuccess } from "../utils/handleResponse";
import { StatusCodes } from "../types/apiTypes";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await dbLogin(req.body);
    const validateUser = await findByEmail(req.body.email);

    if (!validateUser) {
      handleError(res, StatusCodes.NotFound, "User not registered");
    }

    if (!user) {
      handleError(res, StatusCodes.BadRequest, "Invalid email or password");
    }

    const userResponse = createUserResponse(user);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodes.OK, {
      token,
      user: userResponse,
    });
  } catch (error) {
    handleError(
      res,
      StatusCodes.InternalServerError,
      "Something went wrong. Please try again later..."
    );
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const emailTaken = await findByEmail(req.body.email);

    if (emailTaken) {
      handleError(res, StatusCodes.BadRequest, "Email already taken");
    }

    const newUser = await dbRegister(req.body);

    const userResponse = createUserResponse(newUser);

    const token = handleJwt(userResponse);

    handleSuccess(res, StatusCodes.Created, { token, user: userResponse });
  } catch (error) {
    handleError(
      res,
      StatusCodes.InternalServerError,
      "Something went wrong. Please try again later..."
    );
  }
};
