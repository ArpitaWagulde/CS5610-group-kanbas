import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import MultipleChoice from "./MultipleChoice";
import TrueOrFalse from "./TrueOrFalse";
import FillInTheBlanks from "./FillInTheBlanks";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion, updateQuestion, deleteQuestion } from "../Editor/reducer";
import * as service from "../Editor/service";
import * as quizService from "../service";
import { setQuiz } from "../reducer";
import { KanbasState } from "../../../store";
function QuestionTypes() {
  const { courseId, quizId, questionId } = useParams();
  const editorRef = useRef<any>(null);
  // if (editorRef.current) {
  //   console.log(editorRef.current.getContent());
  // }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const handleUpdateQuestion = async (question: any) => {
    try {
      const status = await service.updateQuestion(question);
      dispatch(updateQuestion(question));

      let newPoints = 0;
      const questions = await service.findQuestionsForQuiz(quizId);
      questions.forEach((q: any) => (newPoints += q.points));

      const newQuiz = { ...quiz, points: newPoints };
      await quizService.updateQuiz(newQuiz);
      dispatch(setQuiz(newQuiz));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOptionChange = (event: any) => {
    const selectedValue = event.target.value;
    dispatch(setQuestion({ ...question, type: selectedValue }));
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    service.findQuestionById(questionId).then((question) => {
      dispatch(setQuestion(question));
      setSelectedOption(question.type);
    });
  }, [questionId]);

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
            placeholder="Question Title"
            value={question.title}
            onChange={(e) => {
              dispatch(setQuestion({ ...question, title: e.target.value }));
            }}
          />
          &nbsp;
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="form-select w-25 form-control"
            defaultChecked={question.type}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueorFalse">True or False</option>
            <option value="FillinTheBlanks">Fill in the blanks</option>
          </select>
          &nbsp; pts:
          <div>
            <input
              className="form-control"
              type="number"
              value={question.points}
              onChange={(e) => {
                dispatch(setQuestion({ ...question, points: e.target.value }));
              }}
            />
          </div>
        </div>
        <h3> Question:</h3>
        <Editor
          apiKey="35aak55ndvlmx85j5wj9cirir6bycvthbursi8lw1k0b2trg"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={question.description}
          onChange={() => {
            const updatedContent = editorRef.current.getContent();
            dispatch(setQuestion({ ...question, description: updatedContent }));
          }}
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
        <Button
          className="btn btn-success"
          onClick={() => {
            handleUpdateQuestion(question);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
          }}
        >
          Update Question
        </Button>
        <Button
          className="btn btn-danger"
          onClick={() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
          }}
        >
         Cancel
        </Button>
      </div>
    </>
  );
}

export default QuestionTypes;
