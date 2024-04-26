import { FaBars, FaGlasses } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as quizService from "../Quizzes/service";
import * as assignmentService from "../Assignments/service";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz } from "../Quizzes/reducer";
import { setAssignment } from "../Assignments/reducer";
import { KanbasState } from "../../store";

function Breadcrumb({ course }: { course: any }) {
  const { pathname } = useLocation();
  const currLocation = pathname.split("/")[4].replace(/%20/g, " ");
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const { courseId, assignmentId, quizId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    assignmentService.findAssignmentsForCourse(courseId).then((assignments) => {
      const assignment = assignments.find(
        (assignment: any) => assignment.id === assignmentId
      );
      if (assignment) {
        dispatch(setAssignment(assignment));
      } else {
        dispatch(setAssignment(null));
      }
    });
    quizService.findQuizzesForCourse(courseId).then((quizzes) => {
      const quiz = quizzes.find((quiz: any) => quiz.id === quizId);
      if (quiz) {
        dispatch(setQuiz(quiz));
      } else {
        dispatch(setQuiz(null));
      }
    });
  }, [courseId, assignmentId, quizId, dispatch]);

  return (
    <>
      <FaBars className="ps-1 pe-2 fs-2" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/Kanbas/Courses/${courseId}/Home`}>
              {course?.number} {course?.name}
            </Link>
          </li>
          {currLocation === "Assignments" && assignment ? (
            <>
              <li className="breadcrumb-item" aria-current="page">
                <Link to={`/Kanbas/Courses/${courseId}/${currLocation}`}>
                  Assignments
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {assignment.title}
              </li>
            </>
          ) : currLocation === "Quizzes" && quiz ? (
            <>
              <li className="breadcrumb-item" aria-current="page">
                <Link to={`/Kanbas/Courses/${courseId}/${currLocation}`}>
                  Quizzes
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {quiz.title}
              </li>
            </>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link to={`/Kanbas/Courses/${courseId}/${currLocation}`}>
                {currLocation === "Home" ? "Modules" : currLocation}
              </Link>
            </li>
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
  const currLocation = pathname.split("/")[4].replace(/%20/g, " ");
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const { courseId, assignmentId, quizId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    assignmentService.findAssignmentsForCourse(courseId).then((assignments) => {
      const assignment = assignments.find(
        (assignment: any) => assignment.id === assignmentId
      );
      if (assignment) {
        dispatch(setAssignment(assignment));
      } else {
        dispatch(setAssignment(null));
      }
    });
    quizService.findQuizzesForCourse(courseId).then((quizzes) => {
      const quiz = quizzes.find((quiz: any) => quiz.id === quizId);
      if (quiz) {
        dispatch(setQuiz(quiz));
      } else {
        dispatch(setQuiz(null));
      }
    });
  }, [courseId, assignmentId, quizId, dispatch]);
  return (
    <span style={{ textDecoration: "none", color: "white" }}>
      {course?.number}.{course?.name}
      <br />
      {currLocation === "Assignments" && assignment ? (
        <>
          Assignments
          <br />
          {assignment.title}
        </>
      ) : currLocation === "Quizzes" && quiz ? (
        <>
          Quizzes
          <br />
          {quiz.title}
        </>
      ) : (
        <>{currLocation === "Home" ? "Modules" : currLocation}</>
      )}
    </span>
  );
}

export default Breadcrumb;
export { MobileBreadcrumb };
