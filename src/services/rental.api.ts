import { apiInstance } from ".";

export const getRentals = async () => {
  const response = await apiInstance.get("/rental");
  return response.data;
};

export const getUserRentals = async (userId: number): Promise<any> => {
  try {
    const response = await apiInstance.get(`/rental/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товаров аренды", error);
    throw error;
  }
};

export interface RentalDto {
  startDate: string;
  endDate: string;
  totalAmount: number;
  userId: number;
}

export const addUserRental = async (
  dto: RentalDto,
  accessToken: string,
  equipments: { id: number; quantity: number }[]
): Promise<any> => {
  try {
    const response = await apiInstance.post(
      `/rental`,
      { ...dto },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    const userRental = response.data;

    if (userRental && userRental.id) {
      const rentalEquipmentResponses = await Promise.all(
        equipments.map(async (equipment) => {
          return await apiInstance.post(
            `/rental-equipment`,
            {
              rentalId: userRental.id,
              equipmentId: equipment.id,
              quantity: equipment.quantity,
            },
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          );
        })
      );

      return rentalEquipmentResponses.map((resp) => resp.data);
    }

    return [];
  } catch (error) {
    console.error("Ошибка при добавлении товаров аренды", error);
    throw error;
  }
};

export const updateRentalStatus = async (
  rentalId: number,
  statusId: number,
  accessToken: string
) => {
  try {
    const response = await apiInstance.put(
      `/rental/${rentalId}/status`,
      {
        statusId,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении статуса аренды", error);
    throw error;
  }
};

export const getRentalDocument = async (
  rentalId: number,
  accessToken: string
): Promise<any> => {
  try {
    const response: any = await apiInstance.get(
      `/rental/${rentalId}/document`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      }
    );

    if (!response || !response.data) {
      throw new Error(
        "Не удалось получить документ аренды. Ответ не содержит данных."
      );
    }

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `rental_document_${rentalId}.docx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка при скачивании документа аренды:", error);
    alert(
      "Произошла ошибка при загрузке документа. Пожалуйста, попробуйте снова."
    );
    throw error;
  }
};
