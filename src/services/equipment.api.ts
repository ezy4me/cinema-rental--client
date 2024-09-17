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
