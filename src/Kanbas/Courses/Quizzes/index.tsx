import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaFilePen, FaPlus } from "react-icons/fa6";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { deleteQuiz, setQuiz, setQuizzes } from "./reducer";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as service from "./service";

function getStatus(quiz:any) {
  const currentDate = new Date();
  const availableDate = new Date(quiz.available_date);
  const untilDate = new Date(quiz.until_date);
  const dueDate = new Date(quiz.due_date);

  if (currentDate < availableDate) {
      return "Not Available";
  } else if (currentDate > untilDate) {
      return "Not Available";
  } else if (currentDate >= availableDate && currentDate <= untilDate) {
      return "Available";
  } else if (currentDate > dueDate) {
      return "Past Due";
  }
}

function Quizzes() {
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );
  const status = getStatus(quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleDeleteAssignment = (quizId: string) => {
    service.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };
  useEffect(() => {
    service.findQuizzesForCourse(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
    });
  }, [courseId]);

  return (
    <div className="flex-fill">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this quiz?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteAssignment(quiz.id);
              setShow(false);
            }}
          >
            Ok
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{ justifySelf: "stretch" }}
        className="d-flex wd-asmt-home-buttons justify-content-between m-2"
      >
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search for Quiz"
        />
        <div style={{ justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-light"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
              navigate(
                `/Kanbas/Courses/${courseId}/Quizzes/${
                  "A" + new Date().getTime().toString()
                }`
              );
            }}
          >
            <FaPlus className="ms-2" /> Quiz
          </button>
          <button
            style={{ height: "37px" }}
            type="button"
            className="btn btn-light"
          >
            <FaEllipsisV />
          </button>
          <br />
        </div>
      </div>
      <hr className="ms-2 me-2" />
      <ul className="list-group wd-asmt-list m-2">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> Assignment Quizzes
          </div>
          <ul className="list-group">
            {quizList.map((quiz) => (
              <li className="list-group-item">
                <div className="d-flex">
                  <div style={{ alignSelf: "center" }}>
                    <FaEllipsisV className="me-2" />
                    <FaFilePen className="m-2 text-success" />
                  </div>
                  <div className="text-secondary p-1">
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                    >
                      {quiz.title}
                    </Link>
                    <br />
                    <small>
                      {status} | Due {quiz.due_date} |{" "}
                      {quiz.points} 
                    </small>
                  </div>
                  <div className="ms-auto" style={{ alignSelf: "center" }}>
                    <span>
                      <button
                        onClick={() => {
                          dispatch(setQuiz(quiz));
                          setShow(true);
                        }}
                        className="btn btn-danger m-2 p-1"
                        style={{ borderRadius: "0.375rem" }}
                      >
                        Delete
                      </button>
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default Quizzes;
