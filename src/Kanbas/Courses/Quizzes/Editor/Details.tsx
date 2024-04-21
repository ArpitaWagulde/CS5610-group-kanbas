import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./index.css";
import { addQuiz, setQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function DetailsEditor() {
  const editorRef = useRef<any>(null); // Specify the type as Editor
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const existsQuiz = quizzes.find((quiz) => quiz.id === quizId);
  const handleAddQuiz = () => {
    service.createQuiz(courseId, quiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };
  const handleUpdateQuiz = async () => {
    const status = await service.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  useEffect(() => {
    if (existsQuiz !== undefined) {
      dispatch(setQuiz(existsQuiz));
    } else {
      dispatch(setQuiz([]));
    }
  }, []);

  return (
    <div className="wd-asmt-edit-home flex-fill">
      <h3>Quiz Name</h3>
      <input
        className="form-control"
        id="assignment-name"
        onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))}
        value={quiz?.title}
      />
      <br />
      Quiz Instructions:
      <Editor
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
      <button onClick={log}>Log editor content</button>
      <div>
        <div className="row">
          <div className="col-3">Assignment Group</div>
          <div className="col-9">
            <select className="form-select" id="groups">
              <option selected value="assignments">
                ASSIGNMENTS
              </option>
              <option value="quiz">QUIZ</option>
              <option value="exam">EXAMS</option>
              <option value="project">PROJECT</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-3">Quiz Type</div>
          <div className="col-9">
            <select className="form-select" id="grade">
              <option selected value="graded">
                Graded Quiz
              </option>
              <option value="practice">Practice Quiz</option>
              <option value="gradedsurvey">Graded Survey</option>
              <option value="ungradedsurvey">Ungraded Survey</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-9" style={{ textAlign: "left" }}>
            <b>Options</b>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              value="do-not-count"
              name="check-do-not-count"
              id="chkbox-do-not-count"
            />
            <label
              className="form-check-label ps-1 border-solid border-2"
              htmlFor="chkbox-do-not-count"
            >
              Shuffle Answers
            </label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              value="do-not-count"
              name="check-do-not-count"
              id="chkbox-do-not-count"
            />
            <label
              className="form-check-label ps-1 border-solid border-2"
              htmlFor="chkbox-do-not-count"
            >
              Time Limit
            </label>{" "}
            &nbsp;
            <input className="form-check-input" type="text" value="" />
            <label>Minutes</label>
            <br />
            <div className="border border-light-grey rounded border-1 m-1 p-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="do-not-count"
                name="check-do-not-count"
                id="chkbox-do-not-count"
              />
              <label
                className="form-check-label ps-1 "
                htmlFor="chkbox-do-not-count"
              >
                Allow Multiple Attempts
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-3">Assign</div>
          <div className="col-9 card p-1">
            <div className="card-body" style={{ textAlign: "left" }}>
              <span className="card-title m-2">
                <b>Assign to</b>
              </span>
              <br />
              <input className="m-2 form-control" value="Everyone" />
              <span className="card-title m-2">
                <b>Due</b>
              </span>
              <br />
              <input
                className="m-2 form-control"
                type="date"
                id="due"
                value={quiz?.due}
                onChange={(e) =>
                  dispatch(setQuiz({ ...quiz, due: e.target.value }))
                }
              />
              <div className="row">
                <div className="col-6">
                  <span className="card-title m-2">
                    <b>Available From</b>
                  </span>
                  <br />
                  <input
                    className="m-2 form-control"
                    type="date"
                    id="from"
                    value="2021-01-01"
                  />
                </div>
                <div className="col-6">
                  <span className="card-title m-2">
                    <b>Until</b>
                  </span>
                  <br />
                  <input
                    className="m-2 form-control"
                    type="date"
                    id="to"
                    value="2021-01-01"
                  />
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "center" }}>
              <i className="fa fa-plus pe-2"></i>Add
            </div>
          </div>
        </div>
        <hr />
        <div className="d-inline">
          <div className="row">
            <div className="col-9" style={{ textAlign: "left" }}>
              <input
                className="form-check-input"
                type="checkbox"
                value="notify-users"
                name="check-notify-users"
                id="chkbox-notify-userst"
              />
              <label
                className="form-check-label ps-1"
                htmlFor="chkbox-notify-users"
              >
                Notify users that this content has changed
              </label>
            </div>
            <div
              className="col-3"
              style={{ float: "right", paddingBottom: "2px" }}
            >
              <button
                onClick={() => {
                  existsQuiz === undefined
                    ? handleAddQuiz()
                    : handleUpdateQuiz();
                  navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
                }}
                className="btn btn-success ms-2 float-end"
              >
                Save
              </button>
              <button
                onClick={() => {
                  existsQuiz === undefined
                    ? handleAddQuiz()
                    : handleUpdateQuiz();
                  navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
                }}
                className="btn btn-success ms-2 float-end"
              >
                Save & Publish
              </button>
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes`}
                className="btn btn-danger float-end"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsEditor;
