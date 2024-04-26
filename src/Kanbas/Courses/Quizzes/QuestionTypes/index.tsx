import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./index.css";
import { useRef } from 'react';
import { addQuestion, setQuestion, updateQuestion,deleteQuestion } from "../Editor/reducer";
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from "react-redux";

import { KanbasState } from "../../../store";
import MultipleChoice from "../Questions/MultipleChoice";
import TrueOrFalse from "../Questions/TrueOrFalse";
import FillInTheBlanks from "../Questions/FillInTheBlanks";

function QuestionTypes() {
    const { courseId, quizId, questionId } = useParams();
    const dispatch = useDispatch();
  
    const questions = useSelector(
      (state: KanbasState) => state.questionsReducer.questions
    );
  
    const question = useSelector(
      (state: KanbasState) => state.questionsReducer.question
    );
    console.log("question in summary:",question);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event:any) => {
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
  const editorRef = useRef<any>(null);
  const log = () => {
      if (editorRef.current) {
          console.log(editorRef.current.getContent());
      }
  };
  
  return (
    <>  
        <div className="wd-asmt-edit-home flex-fill">
        <div className="d-flex align-items-center">
            <input
                
                type="text"
                className="form-control w-25"
                id="assignment-name"
                placeholder="Question Title"
            />
            <select value={selectedOption}
                onChange={handleOptionChange}
                className="form-select w-25 form-control">
                <option defaultChecked value="MultipleChoice">Multiple Choice</option>
                <option value="TrueorFalse">True or False</option>
                <option value="FillinTheBlanks">Fill in the blanks</option>
            </select>
        </div>
        <div>
        <h3> Question:</h3>
            <Editor
            onChange={(e) =>
                dispatch(setQuestion({ ...question, description: e.target.value }))
              }
                apiKey='35aak55ndvlmx85j5wj9cirir6bycvthbursi8lw1k0b2trg'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 150,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            {componentToDisplay}
            </div>
        </div>
    </>
  );
}
export default QuestionTypes;