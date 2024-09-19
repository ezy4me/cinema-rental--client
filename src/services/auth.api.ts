import { apiInstance } from ".";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await apiInstance.post("/auth/login", data);
  
  return response.data;
};

interface RegisterData {
  email: string;
  password: string;
}


export const register = async (data: RegisterData) => {
  const response = await apiInstance.post("/auth/register", data);
  return response.data;
};
