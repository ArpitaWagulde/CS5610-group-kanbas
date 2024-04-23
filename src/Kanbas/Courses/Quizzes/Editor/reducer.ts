import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: <any[]>[],
  question: {
    id:"",
    title: "Unnamed Question",
    points: "8 pts",
    question_count: "12 Questions",
    
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
        (question) => question.id !== action.payload
      );
    },

    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
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
