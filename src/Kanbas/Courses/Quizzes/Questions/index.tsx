import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./index.css";
import MultipleChoice from "./MultipleChoice";
import TrueOrFalse from "./TrueOrFalse";
import FillInTheBlanks from "./FillInTheBlanks";
import Preview from "../Preview";
import { Editor } from "@tinymce/tinymce-react";
function QuestionTypes() {
  const { pathname } = useLocation();
  const editorRef = useRef<any>(null);
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
        <h3> Question:</h3>
        <Editor
          apiKey="35aak55ndvlmx85j5wj9cirir6bycvthbursi8lw1k0b2trg"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 150,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div>{componentToDisplay}</div>
      </div>
    </>
  );
}
export default QuestionTypes;
