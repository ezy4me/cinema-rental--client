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

export const addEquipment = async (data: any, accessToken: string) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("pricePerDay", data.pricePerDay.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("brandId", data.brandId);

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await apiInstance.post("/equipment", formData, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateEquipment = async (
  id: number,
  data: any,
  accessToken: string
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("pricePerDay", data.pricePerDay.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("brandId", data.brandId);

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await apiInstance.put(`/equipment/${id}`, formData, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

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
