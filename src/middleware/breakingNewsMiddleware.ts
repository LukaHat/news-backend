import { NextFunction, Request, Response } from "express";
import { NewsPostModel } from "../models/NewsPost";

export const handleBreakingNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isBreakingNews } = req.body;

    if (isBreakingNews) {
      const existingBreakingNews = await NewsPostModel.findOne({
        isBreakingNews: true,
      });

      if (existingBreakingNews) {
        await NewsPostModel.findByIdAndUpdate(existingBreakingNews._id, {
          isBreakingNews: false,
        });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
