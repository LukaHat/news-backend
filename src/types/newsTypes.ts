export interface NewsPostCreate {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category: ["worldwide", "local", "sport"];
  isBreakingNews: boolean;
}
