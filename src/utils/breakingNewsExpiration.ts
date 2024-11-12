import { Types } from "mongoose";
import { NewsPostModel } from "../models/NewsPost";
import cron from "node-cron";
import { BREAKING_NEWS_EXPIRATION } from "../constants/applicationConstants";

export const handleBreakingNewsExpiration = (id: Types.ObjectId) => {
  const task = cron.schedule(
    `0 */${BREAKING_NEWS_EXPIRATION} * * *`,
    async () => {
      await NewsPostModel.findByIdAndUpdate(id, { isBreakingNews: false });
      task.stop();
    }
  );
};
