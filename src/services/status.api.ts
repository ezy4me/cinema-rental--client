import { apiInstance } from ".";

export const getStatuses = async () => {
  const response = await apiInstance.get("/status");
  return response.data;
};

export const getStatusById = async (statusId: number): Promise<any> => {
  try {
    const response = await apiInstance.get(`/status/${statusId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении статуса", error);
    throw error;
  }
};

export interface StatusDto {
  name: string;
}

export const createStatus = async (
  dto: StatusDto,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.post(`/status`, dto, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании статуса", error);
    throw error;
  }
};

export const updateStatus = async (
  statusId: number,
  dto: StatusDto,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.put(`/status/${statusId}`, dto, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении статуса", error);
    throw error;
  }
};

export const deleteStatus = async (
  statusId: number,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.delete(`/status/${statusId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении статуса", error);
    throw error;
  }
};
