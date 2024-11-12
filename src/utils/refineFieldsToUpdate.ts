import { NewsPost, NewsPostCreate } from "../types/newsTypes";

export const refineFieldsToUpdate = (
  fieldsToUpdate: Partial<NewsPostCreate>,
  newsPost: NewsPost
) => {
  const updateFields: Partial<Record<keyof NewsPost, any>> = {};

  (Object.keys(fieldsToUpdate) as (keyof typeof fieldsToUpdate)[]).forEach(
    (key) => {
      const newValue = fieldsToUpdate[key];
      const existingValue = newsPost[key];

      if (existingValue !== newValue) {
        updateFields[key] = newValue;
      }
    }
  );

  return updateFields;
};
