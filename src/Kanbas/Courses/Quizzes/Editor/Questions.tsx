import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./index.css";
import { addQuestion, setQuestion, updateQuestion } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "./service";

function QuestionsEditor() {
  const { courseId, quizId, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const existsQuestion = questions.find(
    (question) => question.id === questionId
  );
  const handleAddQuestion = () => {
    service.createQuestion(quizId, question).then((question) => {
      dispatch(addQuestion(question));
    });
  };
  const handleUpdateQuestion = async () => {
    const status = await service.updateQuestion(question);
    console.log("in editor", question);
    dispatch(updateQuestion(question));
  };
  useEffect(() => {
    if (existsQuestion !== undefined) {
      dispatch(setQuestion(existsQuestion));
    } else {
      dispatch(setQuestion([]));
    }
  }, []);
  return (
    <>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        + New Question
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        + New Question Group
      </button>
      <button className="btn btn-light m-1 border border-light-grey rounded border-1">
        &#128269; Find Question
      </button>
    </>
  );
}
export default QuestionsEditor;
