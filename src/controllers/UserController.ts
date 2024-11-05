import { Request, Response } from "express";
import {
  login as dbLogin,
  register as dbRegister,
  findByEmail,
} from "../repositories/UserRepository";
import { createUserResponse } from "../utils/createUserResponse";
import { handleJwt } from "../utils/handleJwt";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await dbLogin(req.body);

    if (!user) {
      res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userResponse = createUserResponse(user);

    const token = handleJwt(userResponse);

    res.status(200).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const emailTaken = await findByEmail(req.body.email);

    if (emailTaken) {
      res.status(400).json({
        success: false,
        message: "Email already taken",
      });
    }

    const newUser = await dbRegister(req.body);

    const userResponse = createUserResponse(newUser);

    const token = handleJwt(userResponse);

    res.status(201).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
