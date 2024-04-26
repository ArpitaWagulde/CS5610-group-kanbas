import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { setQuiz } from "../reducer";
import { setQuestions } from "../Editor/reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import * as questionService from "../Editor/service";
import { FaInfoCircle, FaPencilAlt } from "react-icons/fa";
import Timestamp from "react-timestamp";
import { Button } from "react-bootstrap";
import { CiCircleQuestion } from "react-icons/ci";

function Preview() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    service.findQuiz(quizId).then((quiz) => {
      dispatch(setQuiz(quiz));
    });
    questionService.findQuestionsForQuiz(quizId).then((questions) => {
      dispatch(setQuestions(questions));
    });
  }, [quizId]);

  const renderOptions = (questionType: string, options: string[]) => {
    switch (questionType) {
      case "FillinTheBlanks":
        return (
          <div>
            Answer: <input type="text" />
          </div>
        );
      case "TrueorFalse":
        return (
          <div>
            <input type="radio" name="trueFalse" value="true" />
            <label>True</label>
            <br></br>
            <input type="radio" name="trueFalse" value="false" />
            <label>False</label>
          </div>
        );
      case "MultipleChoice":
        return options.map((option, index) => (
          <div key={index}>
            <input type="radio" name="multipleChoice" value={option} />
            <label>{option}</label>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <h2>{quiz?.title}</h2>
      <div className="info-box" style={{ float: "left" }}>
        <div className="info-symbol">
          <FaInfoCircle />
        </div>
        <div className="info-text">
          This is a preview of the published version of the quiz
        </div>
      </div>
      <br />
      <br />

      <p></p>
      <div>
        Start time of Quiz: <Timestamp date={new Date()} />
      </div>
      <h2>Quiz Instructions</h2>
      <hr />
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <div className="preview-card">
              <div
                className="preview-card-header bg-light-grey"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4 className="preview-card-heading">{question.title}</h4>
                <h4 className="preview-card-heading">{question.points} pts</h4>
              </div>

              <div className="preview-card-body">
                {question.description.replace(/<\/?p>/g, "")}
                <hr></hr>
                {renderOptions(question.type, question.options)}
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      <div className="m-1 p-2" style={{ border: "1px solid #ccc" }}>
        Quiz Saved at :
        <Timestamp date={new Date()} />{" "}
        <button className="btn btn-light" style={{ border: "1px solid #ccc" }}>
          Submit Quiz
        </button>
      </div>

      <Button
        className="btn btn-light"
        onClick={() => {
          navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
        }}
        style={{ border: "1px solid #ccc" }}
      >
        <FaPencilAlt /> Keep Editing the Quiz?
      </Button>

      <div>
        <h5>Questions</h5>
        <ul style={{ listStyleType: "none" }}>
          {questions.map((question) => (
            <li>
              <div className="d-flex">
                <CiCircleQuestion className="icon m-1" size={24} />
                <div style={{ alignSelf: "center", color: "red" }}>
                  {question.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Preview;
