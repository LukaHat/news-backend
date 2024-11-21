import { Request } from "express";
import { RoleEnum } from "./userTypes";
import { Types } from "mongoose";

export enum StatusCodes {
  OK = 200,
  Created = 201,
  Accepted = 202,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export interface GlobalError extends Error {
  message: string;
  statusCode?: StatusCodes;
}

export interface UserRequest extends Request {
  user: {
    _id: Types.ObjectId;
    role: RoleEnum;
    fullName: string;
  };
}
