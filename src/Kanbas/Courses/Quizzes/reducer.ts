import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: <any[]>[],
  quiz: {
    id: "1234",
    status: "Closed",
    due_date: "2024-03-04",
    points: "8 pts",
    question_count: "12 Questions",
    published: "false",
    title: "Unnamed Quiz",
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      console.log("inside add",action.payload);
      state.quizzes = [{ ...action.payload }, ...state.quizzes];
      console.log("after add",state.quizzes);
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload.id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      console.log("setQuiz",action.payload);
      state.quiz = action.payload;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    publishQuiz: (state, action) => {
      console.log("reducer", action.payload);
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload.id) {
          return { ...quiz, published: action.payload.published };
        } else {
          return quiz;
        }
      });
      console.log(state.quizzes);
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  publishQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
