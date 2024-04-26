import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { setQuestion } from "../Editor/reducer";
import "./index.css";

function TrueOrFalse() {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    question.answer[0] || ""
  );
  const options = ["True", "False"];
  const handleRadioButtonChange = (value: string) => {
    setSelectedAnswer(value);
    dispatch(setQuestion({ ...question, answer: [value] }));
  };

  useEffect(() => {
    setSelectedAnswer(question.answer[0] || "");
  }, [question.answer]);

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <br />
      <hr />
      <br />
      Enter your question text, then select True or False based on the correct
      answer.
      <div></div>
      <br />
      <br />
      <h3> Answers:</h3>
      <div>
        {options.map((option: any, index: any) => (
          <div key={index} className="option-container">
            <input
              type="radio"
              name="correct-answer"
              checked={selectedAnswer === option}
              onChange={() => handleRadioButtonChange(option)}
            />
            <input
              type="text"
              className="form-control w-25 option-text"
              value={option}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TrueOrFalse;
