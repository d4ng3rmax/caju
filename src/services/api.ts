import axios from "axios";
import { Registration } from "~/types/registration";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

export const updateRegistration = async (id: number, updatedFields: Partial<Registration>) => {
  const response = await api.put(`/registrations/${id}`, updatedFields);
  return response.data;
};

export const deleteRegistration = async (id: number) => {
  await api.delete(`/registrations/${id}`);
};
