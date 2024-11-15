import { Document } from "mongoose";

export interface NewsPostCreate {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category?: CategoryEnum;
  isBreakingNews: boolean;
}

export enum CategoryEnum {
  WORLDWIDE = "worldwide",
  LOCAL = "local",
  SPORT = "sport",
}

export interface NewsPost extends Document {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category?: CategoryEnum;
  isBreakingNews: boolean;
  createdAt: Date;
  updatedAt: Date;
}
