import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI, PORT, NEWS_API_KEY } = process.env;

if (!MONGO_URI.length) {
  console.error("Mongo Uri was not defined");
  process.exit(1);
}

export const config = {
  mongoUri: MONGO_URI as string,
  port: PORT || 8000,
  newsApiKey: NEWS_API_KEY as string,
};
