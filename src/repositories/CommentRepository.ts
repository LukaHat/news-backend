import { GlobalError, StatusCodes } from "../types/apiTypes";
import { CommentModel } from "../models/Comment";
import { CommentData } from "../types/commentTypes";
import { COMMENTS_PER_PAGE } from "../constants/applicationConstants";

export const createComment = async (commentData: CommentData) => {
  const newComment = new CommentModel({ ...commentData });

  return await newComment.save();
};

export const deleteComment = async (commentId: string) => {
  const commentToDelete = CommentModel.findById(commentId);

  if (!commentToDelete) {
    const error: GlobalError = new Error(
      "Could not find the comment you are trying to delete"
    );
    error.statusCode = StatusCodes.NotFound;
    throw error;
  }

  return await CommentModel.findByIdAndDelete(commentId);
};

export const getCommentsByPostId = async (postId: string, page: number = 1) => {
  const comments = await CommentModel.find({ postId: postId })
    .sort("-createdAt")
    .skip((page - 1) * COMMENTS_PER_PAGE)
    .limit(COMMENTS_PER_PAGE)
    .lean();

  const commentCount = await CommentModel.countDocuments();

  const nextPage = commentCount >= page * COMMENTS_PER_PAGE;

  return { comments, nextPage };
};
