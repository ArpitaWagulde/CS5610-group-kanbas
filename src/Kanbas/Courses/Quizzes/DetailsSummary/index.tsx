import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { setQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import { FaCheckCircle, FaEllipsisV, FaEdit, FaBan } from "react-icons/fa";
import { handlePublishQuiz } from "../index";

function QuizDetailsSummary() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const [published, setPublished] = useState(Boolean);
  // console.log("details screen", quiz);

  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    service.findQuiz(quizId).then((quiz) => {
      dispatch(setQuiz(quiz));
      setPublished(quiz.published);
    });
  }, [quizId]);

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <div className="d-flex justify-content-end wd-quiz-details">
        {published ? (
          <button
            className="btn btn-light"
            onClick={() => {
              handlePublishQuiz(quiz);
              setPublished(false);
            }}
          >
            <FaBan /> &nbsp; Unpublish
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => {
              handlePublishQuiz(quiz);
              setPublished(true);
            }}
          >
            <FaCheckCircle /> &nbsp; Publish
          </button>
        )}
        <button
          className="btn btn-light"
          onClick={() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Preview`);
          }}
        >
          Preview
        </button>
        <button
          className="btn btn-light"
          onClick={() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`);
          }}
        >
          <FaEdit />
          &nbsp;Edit
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
            {quiz?.shuffle_answers ? "Yes" : "No"}
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
            {quiz?.multiple_attempts ? "Yes" : "No"}
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
            {quiz?.one_question ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Webcam Required</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.webcam ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <b>Lock Questions after answering</b>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {quiz?.lock_question ? "Yes" : "No"}
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-3" style={{ textAlign: "left" }}>
            <b>Due</b>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <b>For</b>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <b>Available From</b>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <b>Until</b>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-3" style={{ textAlign: "left" }}>
            {" "}
            {formatDate(quiz?.due_date)}{" "}
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            {" "}
            {quiz?.quizFor}{" "}
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            {" "}
            {formatDate(quiz?.available_date)}{" "}
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            {" "}
            {formatDate(quiz?.until_date)}{" "}
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default QuizDetailsSummary;
