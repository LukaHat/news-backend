import { Types } from "mongoose";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  fullName?: string;
  alias?: string;
  role: Role;
}

export type UserDb = Omit<UserRegister, "password"> & {
  _id: Types.ObjectId;
  registeredAt: Date;
};

export type UserResponse = Omit<UserDb, "registeredAt"> & {
  createdAt: Date;
};

export interface JwtPayload extends UserDb {
  iat: number;
  exp: number;
}

export enum Role {
  ADMIN = "admin",
  GUEST = "guest",
  EDITOR = "editor",
}
