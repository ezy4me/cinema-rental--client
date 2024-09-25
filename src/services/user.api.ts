import { apiInstance } from ".";

export const getCategories = async (): Promise<any[]> => {
  const response = await apiInstance.get("/user");
  return response.data;
};

export const getCategoryById = async (id: number): Promise<any> => {
    const response = await apiInstance.get(`/user/${id}`);
    return response.data;
  };
  
