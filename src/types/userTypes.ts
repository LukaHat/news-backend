import { Types } from "mongoose";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  fullName?: string;
  alias?: string;
  role: string;
}

export type UserDb = Omit<UserRegister, "password"> & {
  _id: Types.ObjectId;
  registeredAt: Date;
};

export type UserResponse = Omit<UserDb, "registeredAt"> & {
  createdAt: Date;
};
