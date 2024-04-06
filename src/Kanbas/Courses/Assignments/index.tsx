import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaFilePen, FaPlus } from "react-icons/fa6";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { deleteAssignment, setAssignment, setAssignments } from "./reducer";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as service from "./service";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleDeleteAssignment = (assignmentId: string) => {
    service.deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignment(assignmentId));
    });
  };
  useEffect(() => {
    service.findAssignmentsForCourse(courseId).then((assignments) => {
      dispatch(setAssignments(assignments));
    });
  }, [courseId]);

  return (
    <div className="flex-fill">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteAssignment(assignment._id);
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
          placeholder="Search for Assignment"
        />
        <div style={{ justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-light">
            <FaPlus className="ms-2" /> Group
          </button>
          <button
            type="button"
            className="btn btn-light"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
              navigate(
                `/Kanbas/Courses/${courseId}/Assignments/${
                  "A" + new Date().getTime().toString()
                }`
              );
            }}
          >
            <FaPlus className="ms-2" /> Assignment
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
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <span className="p-1 me-2 badge border border-dark rounded-pill text-secondary">
                40% of Total
              </span>
              <FaPlus className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <div className="d-flex">
                  <div style={{ alignSelf: "center" }}>
                    <FaEllipsisV className="me-2" />
                    <FaFilePen className="m-2 text-success" />
                  </div>
                  <div className="text-secondary p-1">
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <br />
                    <small>
                      {assignment.coverage} | Due {assignment.due} |{" "}
                      {assignment.weightage} pts
                    </small>
                  </div>
                  <div className="ms-auto" style={{ alignSelf: "center" }}>
                    <span>
                      <button
                        onClick={() => {
                          dispatch(setAssignment(assignment));
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
export default Assignments;
