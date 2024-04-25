import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import {
  addQuestion,
  setQuestion,
  setQuestions,
  deleteQuestion,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "./service";
function QuestionsEditor() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  // console.log("questionsList", questions);
  // console.log("question", question);
  const handleAddQuestion = () => {
    return service.createQuestion(quizId, question).then((question) => {
      dispatch(addQuestion(question));
      dispatch(setQuestion(question));
      return question;
    });
  };

  const handleDeleteQuestion = (questionId: any) => {
    // console.log("in delete", questionId);
    service.deleteQuestion(questionId).then((status) => {
      dispatch(deleteQuestion(questionId));
    });
  };
  useEffect(() => {
    service.findQuestionsForQuiz(quizId).then((questions) => {
      dispatch(setQuestions(questions));
    });
  }, [quizId]);
  return (
    <>
      <button
        className="btn btn-light m-1 border border-light-grey rounded border-1"
        onClick={async () => {
          const newQuestion = await handleAddQuestion();
          navigate(
            `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${newQuestion.id}`
          );
        }}
      >
        + New Question
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        + New Question Group
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        &#128269; Find Question
      </button>
      <ul className="list-group">
        {questions.map((question) => (
          <li className="list-group-item">
            <div className="d-flex">
              <div style={{ alignSelf: "center" }}>{question.title}</div>
              <div className="text-secondary p-1">
                <span className="float-end">
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="btn btn-danger me-2 p-1"
                    style={{ borderRadius: "0.375rem" }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${question.id}`
                      )
                    }
                    className="btn btn-success me-2 p-1"
                    style={{ borderRadius: "0.375rem" }}
                  >
                    Edit
                  </button>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default QuestionsEditor;
