import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./index.css";
import MultipleChoice from "./MultipleChoice";
import TrueOrFalse from "./TrueOrFalse";
import FillInTheBlanks from "./FillInTheBlanks";
function QuestionTypes() {
  const { pathname } = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  let componentToDisplay;
  switch (selectedOption) {
    case "MultipleChoice":
      componentToDisplay = <MultipleChoice />;
      break;
    case "TrueorFalse":
      componentToDisplay = <TrueOrFalse />;
      break;
    case "FillinTheBlanks":
      componentToDisplay = <FillInTheBlanks />;
      break;
    default:
      componentToDisplay = <MultipleChoice />;
  }

  return (
    <>
      <div className="wd-asmt-edit-home flex-fill">
        <div className="d-flex align-items-center">
          <input
            size={2}
            className="form-control w-25"
            id="assignment-name"
            value="Question Title"
          />
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="form-select w-25 form-control"
          >
            <option defaultChecked value="MultipleChoice">
              Multiple Choice
            </option>
            <option value="TrueorFalse">True or False</option>
            <option value="FillinTheBlanks">Fill in the blanks</option>
          </select>
        </div>
        <div>{componentToDisplay}</div>
      </div>
    </>
  );
}
export default QuestionTypes;
