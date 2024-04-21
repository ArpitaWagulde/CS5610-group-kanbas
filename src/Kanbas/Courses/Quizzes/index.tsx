import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaNewspaper,
  FaTimes,
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
import {
  deleteQuiz,
  setQuizzes,
  updateQuiz,
  publishQuiz,
  setQuizById,
} from "./reducer";

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

  const handleEditQuiz = async () => {
    const status = await service.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const handlePublishQuiz = (quiz: any) => {
    const status = service.publishQuiz({
      ...quiz,
      published: !quiz.published,
    });
    dispatch(publishQuiz({ ...quiz, published: !quiz.published }));
    handleCloseMenu();
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

          <FaEllipsisV />

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
              <li className="list-group-item" key={quiz.id}>
                <div className="d-flex">
                  <div style={{ alignSelf: "center" }}></div>
                  <div className="text-secondary p-1">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>
                      {quiz.title}
                    </Link>
                    <br />
                    <small>
                      {getStatus(quiz)} | Due {quiz.due_date} | {quiz.points}{" "}
                      pts | {quiz.question_count}
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
                          }}
                        />
                      ) : (
                        <FaBan
                          className="text-danger"
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            handlePublishQuiz(quiz);
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
                            handleEditQuiz();
                          }}
                        >
                          <FaEdit /> &nbsp; Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            dispatch(setQuizById(quiz.id));
                            handlePublishQuiz(quiz);
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
