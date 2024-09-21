import { apiInstance } from ".";

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
