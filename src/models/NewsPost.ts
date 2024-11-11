import mongoose from "mongoose";

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
      enum: ["worldwide", "local", "sport"],
    },
    isBreakingNews: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NewsPostModel = mongoose.model("NewsPost", NewsPostSchema);
