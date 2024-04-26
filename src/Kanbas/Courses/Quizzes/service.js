import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const axiosWithCredentials = axios.create({
  baseURL: `${API_BASE}/api/`,
  withCredentials: true,
});

export const createQuiz = async (courseId, quiz) => {
  const response = await axiosWithCredentials.post(
    `courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};
export const deleteQuiz = async (quizId) => {
  const response = await axiosWithCredentials.delete(`quizzes/${quizId}`);
  return response.data;
};
export const findQuizzesForCourse = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `courses/${courseId}/quizzes`
  );
  return response.data;
};
export const updateQuiz = async (quiz) => {
  const response = await axiosWithCredentials.put(`quizzes/${quiz.id}`, quiz);
  return response.data;
};
export const publishQuiz = async (quiz) => {
  const response = await axiosWithCredentials.put(`quizzes/${quiz.id}`, quiz);
  return response.data;
};

export const findQuiz = async (quizId) => {
  const response = await axiosWithCredentials.get(`quizzes/${quizId}`);
  return response.data;
};
