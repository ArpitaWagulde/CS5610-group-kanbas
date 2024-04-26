import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaNewspaper,
  FaBan,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as service from "./service";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { deleteQuiz, setQuizzes, publishQuiz, setQuizById } from "./reducer";
import store from "../../store";

function getStatus(quiz: any) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const availableDate = new Date(quiz.available_date);
  const untilDate = new Date(quiz.until_date);
  const month = monthNames[availableDate.getMonth()];
  const day = String(availableDate.getDate() + 1).padStart(2, "0");
  const date = `${month} ${day}`;

  if (currentDate < availableDate) {
    return `Not Available until ${date}`;
  } else if (currentDate >= availableDate && currentDate <= untilDate) {
    return "Available";
  } else if (currentDate > availableDate) {
    return "Closed";
  }
}

const formatDate = (dateString: string): string => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const handlePublishQuiz = (quiz: any) => {
  const status = service.publishQuiz({
    ...quiz,
    published: !quiz.published,
  });
  store.dispatch(publishQuiz({ ...quiz, published: !quiz.published }));
};

function Quizzes() {
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDeleteQuiz = (quizId: string) => {
    service.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };

  useEffect(() => {
    service.findQuizzesForCourse(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
    });
  }, [courseId]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    quizId: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuizId(quizId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedQuizId(null);
  };

  return (
    <div className="flex-fill">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteQuiz(quiz.id);
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
                  "Q" + new Date().getTime().toString()
                }`
              );
            }}
          >
            <FaPlus className="ms-2" /> Quiz
          </button>
          <button className="btn btn-light">
            <FaEllipsisV />
          </button>
          <br />
        </div>
      </div>
      <hr className="ms-2 me-2" />
      <ul className="list-group wd-asmt-list m-2">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> Quizzes
          </div>
          <ul className="list-group">
            {quizList.map((quiz) => (
              <li className="list-group-item" key={quiz.id}>
                <div className="d-flex">
                  <div style={{ alignSelf: "center" }}></div>
                  <div className="text-secondary p-1">
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Summary`}
                    >
                      {quiz.title}
                    </Link>
                    <br />
                    <small>
                      {getStatus(quiz)} | Due {formatDate(quiz.due_date)} |{" "}
                      {quiz.points} pts | {quiz.question_count} Questions
                    </small>
                  </div>
                  <div className="ms-auto" style={{ alignSelf: "center" }}>
                    <span>
                      {quiz.published ? (
                        <FaCheckCircle
                          className="text-success"
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            handlePublishQuiz(quiz);
                            handleCloseMenu();
                          }}
                        />
                      ) : (
                        <FaBan
                          className="text-danger"
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            handlePublishQuiz(quiz);
                            handleCloseMenu();
                          }}
                        />
                      )}
                      <IconButton
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, quiz.id)}
                        style={{ height: "30px" }}
                      >
                        <FaEllipsisV />
                      </IconButton>
                      <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedQuizId === quiz.id}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            setShow(true);
                          }}
                        >
                          <FaTrashAlt /> &nbsp; Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            navigate(
                              `/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Summary`
                            );
                          }}
                        >
                          <FaEdit /> &nbsp; Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            handlePublishQuiz(quiz);
                            handleCloseMenu();
                          }}
                        >
                          {quiz.published ? (
                            <FaBan className="text-danger" />
                          ) : (
                            <FaNewspaper />
                          )}
                          &nbsp;
                          {quiz.published ? "Unpublish" : "Publish"}
                        </MenuItem>
                      </Menu>
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
