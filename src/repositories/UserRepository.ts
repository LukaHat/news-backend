import { compare } from "bcrypt";
import { UserModel } from "../models/User";
import { UserLogin, UserRegister } from "userTypes";

export const login = async (loginData: UserLogin) => {
  const user = await findByEmail(loginData.email);

  const isPasswordValid = await compare(loginData.password, user.password);

  if (isPasswordValid && user) {
    return user;
  }

  return null;
};

export const register = async (newUserData: UserRegister) => {
  const newUser = new UserModel({ ...newUserData });

  return await newUser.save();
};

export const findByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const getRoleById = async (id: string) => {
  return await UserModel.findById(id).select("role");
};
