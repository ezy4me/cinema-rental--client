import { apiInstance } from ".";

export const getUserRentals = async (userId: number): Promise<any> => {
  try {
    const response = await apiInstance.get(`/cart/${userId}`);
    const userCart = response.data;

    if (userCart && userCart.id) {
      const equipmentResponse = await apiInstance.get(
        `/cart/equipment/${userCart.id}`
      );
      return equipmentResponse.data;
    }

    return [];
  } catch (error) {
    console.error("Ошибка при получении товаров из корзины", error);
    throw error;
  }
};