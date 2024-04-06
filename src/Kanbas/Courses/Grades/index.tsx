import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import "./index.css";
import {
  FaCaretDown,
  FaFileExport,
  FaFileImport,
  FaFilter,
} from "react-icons/fa6";
import { FaCog } from "react-icons/fa";

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div className="wd-grade-home flex-fill">
      <div
        style={{ justifyContent: "flex-end" }}
        className="d-flex wd-grade-home-buttons"
      >
        <button type="button" className="btn btn-light">
          <FaFileImport /> Import
        </button>
        <button type="button" className="btn btn-light">
          <FaFileExport /> Export <FaCaretDown />
        </button>
        <button
          style={{ height: "37px" }}
          type="button"
          className="btn btn-light"
        >
          <FaCog />
        </button>
        <br />
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-6">
          <span className="p-2">
            <b>Student Names</b>
          </span>
          <br />
          <input className="p-2 form-control" placeholder="Search Students" />
        </div>
        <div className="col-6">
          <span className="p-2">
            <b>Assignment Names</b>
          </span>
          <br />
          <input
            className="p-2 form-control"
            placeholder="Search Assignments"
          />
        </div>
      </div>
      <button
        className="btn ms-2 me-2 mx-2 my-3"
        style={{ backgroundColor: "#DEDDDD" }}
      >
        <FaFilter /> Apply Filters
      </button>
      <div className="wd-grade-table table-responsive m-2">
        <table className="table table-striped">
          <thead>
            <th style={{ padding: "0.5rem" }}>Student Name</th>
            {as.map((assignment) => (
              <th>{assignment.title}</th>
            ))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find(
                (user) =>
                  user._id === enrollment.user && user.role === "STUDENT"
              );
              if (user) {
                return (
                  <tr>
                    <td>
                      {user?.firstName} {user?.lastName}
                    </td>
                    {as.map((assignment) => {
                      const grade = grades.find(
                        (grade) =>
                          grade.student === enrollment.user &&
                          grade.assignment === assignment._id
                      );
                      return <td>{grade?.grade || ""}</td>;
                    })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
