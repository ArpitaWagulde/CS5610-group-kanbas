import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: <any[]>[],
  quiz: <any>{
    id: "1234",
    description: "",
    due_date: "2024-01-01",
    published: false,
    title: "Unnamed Quiz",
    points: 0,
    assignment_group: "Quizzes",
    shuffle_answers: true,
    time_limit: 20,
    multiple_attempts: false,
    show_correct: "Immediately",
    access_code: "",
    one_question: true,
    webcam: false,
    lock_question: false,
    available_date: "2024-01-01",
    until_date: "2024-01-01",
    question_count: 11,
    course: "CS101",
    quizFor: "Everyone",
    type: "Graded Quiz",
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      // console.log("inside add", action.payload);
      state.quizzes = [{ ...action.payload }, ...state.quizzes];
      // console.log("after add", state.quizzes);
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
        state.quiz = null;
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
