import mongoose from "mongoose";
import { hashPassword } from "../utils/passwordHash";
import { Role } from "../types/userTypes";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    fullName: {
      type: String,
      required: function () {
        return this.role !== "guest";
      },
    },
    alias: {
      type: String,
      required: function () {
        return this.role !== "guest";
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

export const UserModel = mongoose.model("User", UserSchema);
