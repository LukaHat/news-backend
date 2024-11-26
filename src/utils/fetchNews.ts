import axios from "axios";
import { config } from "../config";

export const fetchNewsPosts = async (query: string) => {
  try {
    const response = await axios(
      `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${config.newsApiKey}`
    );

    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return [];
    }

    return articles;
  } catch (error) {
    throw error;
  }
};
