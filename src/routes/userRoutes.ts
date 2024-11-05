import express from "express";
import { login, register } from "../controllers/UserController.ts";

export const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
