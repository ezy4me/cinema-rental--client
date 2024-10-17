import { apiInstance } from ".";

export const sendMail = async (to: string, subject: string, text: string): Promise<any> => {
  const response = await apiInstance.post("/smtp/send", {
    to,
    subject,
    text
  });
  return response.data;
};

export const sendSelfMail = async (subject: string, text: string): Promise<any> => {
    const response = await apiInstance.post("/smtp/sendself", {
      subject,
      text
    });
    return response.data;
  };
  