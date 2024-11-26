import { NextFunction, Request, Response } from "express";
import {
  createNews as dbCreateNews,
  deleteNews as dbDeleteNews,
  getFrontpageNews as dbGetAllNews,
  getNewsById as dbGetNewsById,
  updateNews as dbUpdateNews,
} from "../repositories/NewsRepository.ts";
import { StatusCodes } from "../types/apiTypes.ts";
import { createError } from "../utils/createError.ts";
import { handleError, handleSuccess } from "../utils/handleResponse.ts";
import { fetchNewsPosts } from "../utils/fetchNews.ts";
import { FetchedNewsPost, NewsPostCreate } from "../types/newsTypes.ts";
import { mapArticle } from "../utils/mapFetchedPosts.ts";

export const populateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.params;

    const fetchedNewsPosts: FetchedNewsPost[] = await fetchNewsPosts(query);

    if (fetchedNewsPosts.length === 0) {
      handleError(res, StatusCodes.OK, "No articles found");
    }

    const mappedNewsPosts = fetchedNewsPosts.map((post) => mapArticle(post));

    const data = await Promise.all(
      mappedNewsPosts.map(async (article: NewsPostCreate) => {
        try {
          return await dbCreateNews(article, true);
        } catch (error) {
          createError(
            StatusCodes.InternalServerError,
            next,
            "Could not create article"
          );
        }
      })
    );

    if (!data)
      throw createError(
        StatusCodes.InternalServerError,
        next,
        "Could not create article"
      );

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const createNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return createError(
        StatusCodes.BadRequest,
        next,
        "Bad request! You need to provide the image"
      );
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const newsData = { ...req.body, imageUrl };

    const data = await dbCreateNews(newsData);

    if (!data) throw createError(StatusCodes.InternalServerError, next);

    handleSuccess(res, StatusCodes.Created, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await dbDeleteNews(id);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    if (error.statusCode === StatusCodes.NotFound) {
      createError(error.statusCode, next, error.message as string);
    }

    createError(StatusCodes.InternalServerError, next);
  }
};

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dbGetAllNews();

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const getNewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const page = req.query.page as string;

    const data = await dbGetNewsById(id, page);

    if (!data)
      throw createError(StatusCodes.NotFound, next, "News post not found");

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};

export const updateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    const data = await dbUpdateNews(id, updateData);

    if (!data) throw createError(StatusCodes.InternalServerError, next);

    handleSuccess(res, StatusCodes.OK, data);
  } catch (error) {
    createError(StatusCodes.InternalServerError, next);
  }
};
