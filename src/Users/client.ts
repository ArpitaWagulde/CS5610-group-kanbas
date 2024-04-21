import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
const axiosWithCredentials = axios.create({
  baseURL: `${USERS_API}`,
  withCredentials: true,
});
export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}
export const signin = async (credentials: User) => {
  const response = await axiosWithCredentials.post(`/signin`, credentials);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`/profile`);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(``);
  return response.data;
};
export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(``, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await axiosWithCredentials.delete(`/${user._id}`);
  return response.data;
};
export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`/${id}`);
  return response.data;
};
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`?role=${role}`);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`/signout`);
  return response.data;
};
