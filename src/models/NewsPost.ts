import mongoose from "mongoose";
import { CategoryEnum } from "../types/newsTypes";

const NewsPostSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(CategoryEnum),
    },
    isBreakingNews: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const NewsPostModel = mongoose.model("NewsPost", NewsPostSchema);
export const FetchedPostModel = mongoose.model(
  "FetchedNewsPost",
  NewsPostSchema
);
