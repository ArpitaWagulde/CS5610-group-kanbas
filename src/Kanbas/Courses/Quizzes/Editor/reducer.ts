import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: <any[]>[],
  question: {
    status: "Closed",
    due_date: "2024-03-04",
    points: "8 pts",
    question_count: "12 Questions",
    title:"Unnamed Quiz"
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions = [{ ...action.payload }, ...state.questions];
    },

    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },

    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
