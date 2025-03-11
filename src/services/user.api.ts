import { apiInstance } from ".";

export const deleteUserById = async (
  id: number,
  accessToken: string
): Promise<any> => {
  await apiInstance.delete(`/user/${id}`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};
