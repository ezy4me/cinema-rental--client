import { Category } from "@/types/category";
import { apiInstance } from ".";

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiInstance.get("/category");
  return response.data;
};
