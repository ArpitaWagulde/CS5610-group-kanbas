import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./index.css";
import {
  addQuestion,
  setQuestion,
  updateQuestion,
  deleteQuestion,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "./service";
function QuestionsEditor() {
  const { courseId, quizId, questionId } = useParams();
  const dispatch = useDispatch();

  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  // console.log("questionsList", questions);
  // console.log("question", question);
  const existsQuestion = questions.find(
    (question) => question.id === questionId
  );
  const handleAddQuestion = () => {
    service.createQuestion(quizId, question).then((question) => {
      dispatch(addQuestion(question));
    });
    dispatch(setQuestion(question));
  };

  const handleDeleteQuestion = (questionId: any) => {
    console.log("in delete", questionId);
    service.deleteQuestion(questionId).then((status) => {
      dispatch(deleteQuestion(questionId));
    });
  };
  const handleUpdateQuestion = async (question: any) => {
    dispatch(setQuestion(question));
    const status = await service.updateQuestion(question);
    console.log("in update", question);
    dispatch(updateQuestion(question));
  };
  useEffect(() => {
    // console.log("exisiting in use effect", existsQuestion);
    if (existsQuestion !== undefined) {
      dispatch(setQuestion(existsQuestion));
    } else {
      dispatch(setQuestion([]));
    }
  }, []);
  return (
    <>
      <button
        className="btn btn-light m-1 border border-light-grey rounded border-1"
        onClick={handleAddQuestion}
      >
        + New Question
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        + New Question Group
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        &#128269; Find Question
      </button>
      {/* <input
        value={question.title}
        onChange={(e) =>
          dispatch(setQuestion({ ...question, title: e.target.value }))
        }
        className="form-control m-2"
      /> */}
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
                    onClick={() => dispatch(setQuestion(question))}
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
