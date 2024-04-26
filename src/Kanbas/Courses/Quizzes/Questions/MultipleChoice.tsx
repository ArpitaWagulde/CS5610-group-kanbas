import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { Button } from "react-bootstrap";
import { setQuestion } from "../Editor/reducer";
import React, { useEffect, useState } from "react";
import "./index.css";

function MultipleChoice() {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    question.answer[0] || ""
  );

  const addOption = () => {
    dispatch(setQuestion({ ...question, options: [...question.options, ""] }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    dispatch(setQuestion({ ...question, options: updatedOptions }));
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = question.options.filter(
      (_option: any, i: number) => i !== index
    );
    dispatch(setQuestion({ ...question, options: updatedOptions }));
  };

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
      Enter your questions and multiple answers, then select the one correct
      answer.
      <br />
      <br />
      <h3>Answers:</h3>
      <div id="answers">
        {question.options.map((option: any, index: any) => (
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
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              className="btn btn-primary edit-button"
              onClick={() => console.log("Edit button clicked")}
            >
              Edit
            </button>
            <button
              className="btn btn-danger delete-button"
              onClick={() => handleOptionDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <br />
        <Button className="transparent-button" onClick={addOption}>
          + Add Another Answer
        </Button>
        <br />
      </div>
    </div>
  );
}

export default MultipleChoice;
