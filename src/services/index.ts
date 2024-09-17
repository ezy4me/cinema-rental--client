import axios from "axios";

const commonConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
};

const apiInstance = axios.create({
  ...commonConfig,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiInstance };
