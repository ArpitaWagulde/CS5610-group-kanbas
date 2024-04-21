import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;

export const createQuestion = async (quizId, question) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/question`,
    question
  );
  return response.data;
};
export const deleteQuestion = async (questionId) => {
  console.log(`${QUESTIONS_API}/${questionId}`);
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};
export const findQuestionsForQuiz = async (quizId) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const updateQuestion = async (question) => {
  const response = await axios.put(
    `${QUESTIONS_API}/${question.id}`,
    question
  );
  return response.data;
};
