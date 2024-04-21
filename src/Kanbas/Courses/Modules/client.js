import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const axiosWithCredentials = axios.create({
  baseURL: `${API_BASE}/api/`,
  withCredentials: true,
});
export const deleteModule = async (moduleId) => {
  const response = await axiosWithCredentials.delete(`modules/${moduleId}`);
  return response.data;
};
export const createModule = async (courseId, module) => {
  const response = await axiosWithCredentials.post(
    `courses/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findModulesForCourse = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `courses/${courseId}/modules`
  );
  return response.data;
};
export const updateModule = async (module) => {
  const response = await axiosWithCredentials.put(
    `modules/${module.id}`,
    module
  );
  return response.data;
};
