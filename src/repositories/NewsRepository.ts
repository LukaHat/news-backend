import { NewsPostCreate } from "newsTypes";
import { NewsPostModel } from "../models/NewsPost";
import { handleBreakingNewsExpiration } from "../utils/breakingNewsExpiration";
import { deleteImage } from "../utils/deleteImage";

export const getAllNews = async () => {
  return await NewsPostModel.find();
};

export const createNews = async (newsPostData: NewsPostCreate) => {
  const newNewsPost = new NewsPostModel({ ...newsPostData });

  if (newNewsPost.isBreakingNews) {
    handleBreakingNewsExpiration(newNewsPost._id);
  }

  return await newNewsPost.save();
};

export const updateNews = async (
  id: string,
  updateData: Partial<NewsPostCreate>
) => {
  const updatedPost = await NewsPostModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedPost;
};

export const deleteNews = async (id: string) => {
  const postToDelete = await getNewsById(id);

  if (postToDelete.imageUrl) {
    const imagePath = postToDelete.imageUrl;
    deleteImage(imagePath);
  }

  return await NewsPostModel.findByIdAndDelete(id);
};

export const getNewsById = async (id: string) => {
  return await NewsPostModel.findById(id);
};
