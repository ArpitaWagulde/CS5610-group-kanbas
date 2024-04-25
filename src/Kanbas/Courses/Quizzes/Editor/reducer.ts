import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: <any[]>[],
  question: {
    id: "1234",
    title: "",
    type: "MultipleChoice",
    description: "Enter question here",
    answer: [],
    options: [],
    quizId: "",
    points: 0,
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
      console.log("setQuestion", action.payload);
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
