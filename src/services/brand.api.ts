import { Brand } from "@/types/brand";
import { apiInstance } from ".";

export const getBrands = async (): Promise<Brand[]> => {
  const response = await apiInstance.get("/brand");
  return response.data;
};
