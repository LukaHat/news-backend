import mongoose, { Types } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: "NewsPost",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("Comments", CommentSchema);
