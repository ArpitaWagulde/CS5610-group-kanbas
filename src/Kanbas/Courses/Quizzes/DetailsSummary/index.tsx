import { useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./index.css";
import { addQuiz, setQuizzes, updateQuiz, setQuizById } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import { Routes, Route, Navigate } from "react-router";
import { FaCheckCircle, FaEllipsisV, FaEdit, FaBan } from "react-icons/fa";
import { handlePublishQuiz } from "../index";

function QuizDetailsSummary() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  console.log("details screen", quizzes);
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  console.log("details screen", quiz);
  // const handleAddQuiz = () => {
  //   service.createQuiz(courseId, quiz).then((quiz) => {
  //     dispatch(addQuiz(quiz));
  //   });
  // };
  // const handleUpdateQuiz = async () => {
  //   const status = await service.updateQuiz(quiz);
  //   console.log("in editor", quiz);
  //   dispatch(updateQuiz(quiz));
  // };

  useEffect(() => {
    dispatch(setQuizById(quizId));
  }, [quizId]);

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <div className="d-flex justify-content-end wd-quiz-details">
        {quiz.published ? (
          <button
            className="btn btn-light"
            onClick={() => {
              dispatch(setQuizById(quiz.id));
              handlePublishQuiz(quiz);
            }}
          >
            <FaBan /> &nbsp; Unpublish
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch(setQuizById(quiz.id));
              handlePublishQuiz(quiz);
            }}
          >
            <FaCheckCircle /> &nbsp; Published
          </button>
        )}

        <button className="btn btn-light">Preview</button>
        <button
          className="btn btn-light"
          onClick={() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`);
          }}
        >
          <FaEdit />
          Edit
        </button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>

      <h2>{quiz?.title}</h2>
      <br />
      <div>
        <div className="row">
          <div className="col-3">
            <b>Quiz Type</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.type}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Points</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.points}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Assignment Group</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.assignment_group}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Shuffle Answers</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.shuffle_answers}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Time Limit</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.time_limit} Minutes
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Multiple Attempts</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.multiple_attempts}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Show Correct Answers</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.show_correct}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Access Code</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.access_code}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>One Question at a time</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.one_question}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Webcam Required</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.webcam}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Lock Questions after answering</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.lock_question}
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-4" style={{ textAlign: "left" }}>
            <b>Due</b>
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            <b>Available From</b>
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            <b>Until</b>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-4" style={{ textAlign: "left" }}>
            {" "}
            {quiz?.due_date}{" "}
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            {" "}
            {quiz?.available_date}{" "}
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            {" "}
            {quiz?.until_date}{" "}
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default QuizDetailsSummary;
