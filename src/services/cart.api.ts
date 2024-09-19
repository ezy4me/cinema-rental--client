import { apiInstance } from ".";

export const getCartEquipments = async (userId: number): Promise<any> => {
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

export const addCartEquipment = async (
  userId: number,
  equipmentId: number,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.get(`/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userCart = response.data;

    if (userCart && userCart.id) {
      const equipmentResponse = await apiInstance.post(
        `/cart/equipment/${userCart.id}/${equipmentId}`,
        {},
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      return equipmentResponse.data;
    }

    return [];
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину", error);
    throw error;
  }
};

export const updateCartEquipment = async (
  userId: number,
  equipmentId: number,
  quantity: number,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.get(`/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userCart = response.data;

    if (userCart && userCart.id) {
      const equipmentResponse = await apiInstance.put(
        `/cart/equipment/${userCart.id}/${equipmentId}`,
        { quantity },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      return equipmentResponse.data;
    }

    return [];
  } catch (error) {
    console.error("Ошибка при обновлении товара в корзине", error);
    throw error;
  }
};

export const deleteCartEquipment = async (
  userId: number,
  equipmentId: number,
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiInstance.get(`/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userCart = response.data;

    if (userCart && userCart.id) {
      const equipmentResponse = await apiInstance.delete(
        `/cart/equipment/${userCart.id}/${equipmentId}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      return equipmentResponse.data;
    }

    return [];
  } catch (error) {
    console.error("Ошибка при обновлении товара в корзине", error);
    throw error;
  }
};
