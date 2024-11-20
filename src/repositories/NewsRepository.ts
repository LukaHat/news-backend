import { NewsPostCreate } from "../types/newsTypes";
import { NewsPostModel } from "../models/NewsPost";
import { handleBreakingNewsExpiration } from "../utils/breakingNewsExpiration";
import { deleteImage } from "../utils/deleteImage";
import { refineFieldsToUpdate } from "../utils/refineFieldsToUpdate";
import { GlobalError, StatusCodes } from "../types/apiTypes";

export const getFrontpageNews = async () => {
  const categories = await getAllCategories();

  const breakingNewsPost = await getBreakingNewsPost();

  const newsFromCategories = await Promise.all(
    categories.map(async (category) => {
      return await NewsPostModel.find({ category })
        .select("-views")
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
  const postToUpdate = await NewsPostModel.findById(id);

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
  const postToDelete = await NewsPostModel.findById(id);

  if (!postToDelete) {
    const error: GlobalError = new Error(
      "Could not find the post you are trying to delete"
    );
    error.statusCode = StatusCodes.NotFound;
    throw error;
  }

  if (postToDelete.imageUrl) {
    const imagePath = postToDelete.imageUrl;
    deleteImage(imagePath);
  }

  return await NewsPostModel.findByIdAndDelete(id);
};

export const getNewsById = async (id: string) => {
  const data = await NewsPostModel.findByIdAndUpdate(
    id,
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    }
  );
  return data;
};

const getBreakingNewsPost = async () => {
  return await NewsPostModel.find()
    .select("-views")
    .where({ isBreakingNews: true });
};

const getAllCategories = async () => {
  return await NewsPostModel.distinct("category");
};
