import { FaBars, FaGlasses } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { assignments } from "../../../Kanbas/Database";

function Breadcrumb({ course }: { course: any }) {
  const { pathname } = useLocation();
  const currLocation = pathname.split("/")[4].replace(/%20/g, " ");
  const assignmentId = pathname.split("/")[5];
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  return (
    <>
      <FaBars className="ps-1 pe-2 fs-2" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/Kanbas/Courses/${course?.courseId}/Home`}>
              {course?.number} {course?.name}
            </Link>
          </li>
          {assignment ? (
            <>
              <li className="breadcrumb-item" aria-current="page">
                <Link
                  to={`/Kanbas/Courses/${course?.courseId}/${currLocation}`}
                >
                  {currLocation === "Home" ? "Modules" : currLocation}
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {assignment?.title}
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <Link
                  to={`/Kanbas/Courses/${course?.courseId}/${currLocation}`}
                >
                  {currLocation === "Home" ? "Modules" : currLocation}
                </Link>
              </li>
            </>
          )}
        </ol>
      </nav>
      <button
        style={{ position: "absolute", right: 0 }}
        className="btn btn-light"
      >
        <FaGlasses className="m-1" />
        Student View
      </button>
    </>
  );
}

function MobileBreadcrumb({ course }: { course: any }) {
  const { pathname } = useLocation();
  const currLocation = pathname.split("/")[4];
  const assignmentId = pathname.split("/")[5];
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  return (
    <span style={{ textDecoration: "none", color: "white" }}>
      {course?.number}.{course?.name}
      <br />
      {currLocation === "Assignments" ? (
        <>
          {currLocation}
          <br />
          {assignment?.title}
        </>
      ) : (
        <>{currLocation === "Home" ? "Modules" : currLocation}</>
      )}
    </span>
  );
}

export default Breadcrumb;
export { MobileBreadcrumb };
