import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  useEffect(() => {
    service.findQuiz(quizId).then((quiz) => {
      dispatch(setQuiz(quiz));
    });
    questionService.findQuestionsForQuiz(quizId).then((questions) => {
      dispatch(setQuestions(questions));
    });
  }, [quizId]);
  // console.log(questions);
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
    </div>
  );
}
export default Preview;
