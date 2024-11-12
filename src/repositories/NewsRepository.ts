import { NewsPostCreate } from "../types/newsTypes";
import { NewsPostModel } from "../models/NewsPost";
import { handleBreakingNewsExpiration } from "../utils/breakingNewsExpiration";
import { deleteImage } from "../utils/deleteImage";
import { refineFieldsToUpdate } from "../utils/refineFieldsToUpdate";

export const getFrontpageNews = async () => {
  const categories = await getAllCategories();

  const breakingNewsPost = await getBreakingNewsPost();

  const newsFromCategories = await Promise.all(
    categories.map(async (category) => {
      return await NewsPostModel.find({ category })
        .where({ isBreakingNews: false })
        .limit(4);
    })
  );

  return [breakingNewsPost, ...newsFromCategories].flat();
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
  const postToUpdate = await getNewsById(id);

  const updatedPost = await NewsPostModel.findByIdAndUpdate(
    id,
    {
      ...refineFieldsToUpdate(updateData, postToUpdate),
    },
    {
      new: true,
    }
  );

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

const getBreakingNewsPost = async () => {
  return await NewsPostModel.find().where({ isBreakingNews: true });
};

const getAllCategories = async () => {
  return await NewsPostModel.distinct("category");
};
