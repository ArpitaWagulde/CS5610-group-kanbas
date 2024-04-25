import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { setQuiz } from "../reducer";
import { setQuestions } from "../Editor/reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import * as questionService from "../Editor/service";
import { FaInfoCircle } from "react-icons/fa";

function Preview() {
  const { quizId } = useParams();
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
          </div>);
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
      <br />
      <h2>Quiz Instructions</h2>
      <hr />
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <div className="card">
              <div className="card-header bg-light-grey">
                <h2 className="card-heading">{question.title}</h2>
              </div>
              <div className="card-body">
                {question.description}
                <hr></hr>
                {renderOptions(question.type, question.options)}
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      <button className="submit-quiz-btn">
        Submit Quiz
      </button>
    </div>
  );
}
export default Preview;
