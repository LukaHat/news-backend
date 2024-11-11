import path from "path";
import fs from "fs/promises";

export const deleteImage = async (imageUrl: string) => {
  const filename = imageUrl.split("/").pop();
  const filePath = path.join(process.cwd(), "uploads", filename);

  return await fs.unlink(filePath);
};
