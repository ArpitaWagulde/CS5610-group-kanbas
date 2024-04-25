import { useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./index.css";
import { addQuiz, setQuizzes, updateQuiz, setQuizById } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import { Routes, Route, Navigate } from "react-router";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaEdit,
  FaBan,
  FaInfoCircle,
} from "react-icons/fa";

function Preview() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  useEffect(() => {
    dispatch(setQuizById(quizId));
  }, [quizId]);
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  useEffect(() => {
    dispatch(setQuizById(quizId));
  }, [quizId]);

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <h2>{quiz?.title}</h2>
      {question?.type}

      <div className="info-box" style={{ float: "left" }}>
        <div className="info-symbol">
          <FaInfoCircle />
        </div>
        <div className="info-text">
          This is a preview of the published version of the quiz
        </div>
      </div>
    </div>
  );
}
export default Preview;
