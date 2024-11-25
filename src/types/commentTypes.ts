import { Types } from "mongoose";

export interface CommentData {
  fullName: string;
  comment: string;
  postId: Types.ObjectId;
}
