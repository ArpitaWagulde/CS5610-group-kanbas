import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
export const createQuiz = async (courseId, quiz) => {
  console.log("inside create",quiz);
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export const findQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
export const updateQuiz = async (quiz) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quiz.id}`,
    quiz
  );
  return response.data;
};
export const publishQuiz = async (quiz) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz.id}`, quiz);
  return response.data;
};
