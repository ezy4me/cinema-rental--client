import { apiInstance } from ".";

export const getCustomers = async (accessToken: string): Promise<any> => {
  try {
    const response = await apiInstance.get(
      `/customer`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных о клиентах", error);
    throw error;
  }
};

export const getCustomerInfo = async (
  userId: number,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.get(`/customer/${userId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных клиента", error);
    throw error;
  }
};

export const addCustomerInfo = async (
  userId: number,
  customer: any,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.post(
      `/customer/`,
      { ...customer, userId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении данных клиента", error);
    throw error;
  }
};

export const updateCustomerInfo = async (
  userId: number,
  customer: any,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.put(
      `/customer/${userId}`,
      { ...customer },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении даных клиента", error);
    throw error;
  }
};
