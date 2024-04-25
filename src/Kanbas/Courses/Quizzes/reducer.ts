import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: <any[]>[],
  quiz: {
    id: "1234",
    status: "Closed",
    description:"",
    due_date: "2024-03-04",
    points: "8 pts",
    question_count: "12 Questions",
    published: false,
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
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload.id) {
          return { ...quiz, published: action.payload.published };
        } else {
          return quiz;
        }
      });
    },
    setQuizById: (state, action) => {
      const quizId = action.payload;
      const foundQuiz = state.quizzes.find((q) => q.id === quizId);
      if (foundQuiz) {
        state.quiz = foundQuiz;
      } else {
        console.error(`Quiz with ID ${quizId} not found.`);
      }
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
  setQuizById,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
