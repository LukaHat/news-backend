import {
  CategoryEnum,
  FetchedNewsPost,
  NewsPostCreate,
} from "../types/newsTypes";

export const mapArticle = (article: FetchedNewsPost) => {
  const description = article.description || placeholderArticle.fullDescription;

  return {
    headline: article.title || placeholderArticle.headline,
    shortDescription: shortenDescription(description),
    fullDescription: description,
    imageUrl: article.urlToImage || placeholderArticle.imageUrl,
    isBreakingNews: false,
    category: CategoryEnum.WORLDWIDE,
  };
};

export const shortenDescription = (description: string, words: number = 5) =>
  `${description.split(" ").slice(0, words).join(" ")}...`;

export const placeholderArticle: Partial<NewsPostCreate> = {
  headline: "No headline found",
  fullDescription: "This article does not have a description",
  imageUrl: "https://placehold.co/600x400?font=roboto&text=No+image+found",
};
