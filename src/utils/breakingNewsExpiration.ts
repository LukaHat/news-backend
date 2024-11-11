import { Types } from "mongoose";
import { NewsPostModel } from "../models/NewsPost";
import { BREAKING_NEWS_EXPIRATION } from "../constants/applicationConstants";

export const handleBreakingNewsExpiration = (id: Types.ObjectId) => {
  setTimeout(async () => {
    await NewsPostModel.findByIdAndUpdate(id, { isBreakingNews: false });
  }, BREAKING_NEWS_EXPIRATION);
};
