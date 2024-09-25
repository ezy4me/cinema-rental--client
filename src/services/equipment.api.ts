import { apiInstance } from ".";
import { Equipment } from "@/types/equipment";

export const getEquipments = async (): Promise<Equipment[]> => {
  const response = await apiInstance.get("/equipment");
  return response.data;
};

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  const response = await apiInstance.get(`/equipment/${id}`);
  return response.data;
};

export const deleteEquipmentById = async (
  id: string,
  accessToken: string
): Promise<Equipment> => {
  try {
    const response = await apiInstance.delete(`/equipment/${id}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении данных оборудования", error);
    throw error;
  }
};
