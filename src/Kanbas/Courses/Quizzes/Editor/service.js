import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const axiosWithCredentials = axios.create({
  baseURL: `${API_BASE}/api/`,
  withCredentials: true,
});

export const createQuestion = async (quizId, question) => {
  const response = await axiosWithCredentials.post(
    `quizzes/${quizId}/question`,
    question
  );
  return response.data;
};
export const deleteQuestion = async (questionId) => {
  const response = await axiosWithCredentials.delete(`questions/${questionId}`);
  return response.data;
};
export const findQuestionsForQuiz = async (quizId) => {
  const response = await axiosWithCredentials.get(
    `quizzes/${quizId}/questions`
  );
  return response.data;
};
export const updateQuestion = async (question) => {
  const response = await axiosWithCredentials.put(
    `questions/${question.id}`,
    question
  );
  return response.data;
};
