import { UserResponse } from "userTypes";

export const createUserResponse = (user: UserResponse) => {
  return {
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    alias: user.alias,
    _id: user._id,
    registeredAt: user.createdAt,
  };
};
