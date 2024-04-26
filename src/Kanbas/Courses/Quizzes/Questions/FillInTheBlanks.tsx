import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { Button } from "react-bootstrap";
import "./index.css";
import { setQuestion } from "../Editor/reducer";

function FillInTheBlanks() {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const addOption = () => {
    dispatch(setQuestion({ ...question, answer: [...question.answer, ""] }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.answer];
    updatedOptions[index] = value;
    dispatch(setQuestion({ ...question, answer: updatedOptions }));
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = question.answer.filter(
      (_option: any, i: number) => i !== index
    );
    dispatch(setQuestion({ ...question, answer: updatedOptions }));
  };

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <br />
      <hr />
      <br />
      Enter your questions text, then define all possible correct answers for
      the blank. Students will see the question followed by a small text box to
      type in their answers.
      <div></div>
      <br />
      <h3> Answers:</h3>
      <div id="answers">
        {question.answer.map((option: any, index: any) => (
          <div key={index} className="option-container">
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
          {" "}
          + Add Another Answer
        </Button>
        <br></br>
      </div>
    </div>
  );
}
export default FillInTheBlanks;
