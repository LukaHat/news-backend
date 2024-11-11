import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/userTypes";
import jwt from "jsonwebtoken";

export const reqAuthentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
    }

    const user = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;

    req.body.user = user;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
