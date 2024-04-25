import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addQuiz, setQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from "react-bootstrap";
import "./index.css";

function TrueOrFalse() {
    // const editorRef = useRef<any>(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };
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
            <br />
            <hr />
            <br />
            Enter your questions and multiple answers, then select True or False based on the correct answer.
          
            <div></div>
            <br/>
            {/* <h3> Question:</h3>
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
            /> */}
            <br />
            <h3> Answers:</h3>
            <div className="form-check">
            <input className="form-check-input" style={{ float: "left" }} type="radio" name="exampleRadios" id="exampleRadio1" value="option1"/>
            <label className="form-check-label" style={{ float: "left" }}>
                True
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" style={{ float: "left" }} type="radio" name="exampleRadios" id="exampleRadio2" value="option2"/>
            <label className="form-check-label" style={{ float: "left" }}>
               False
            </label>
            </div>
            <br></br>
            {/* <Button className="btn btn-success">
                Update Question
              </Button>
              <Button className="btn btn-danger">
               
                Discard Changes
              </Button> */}
        </div>
    );
}
export default TrueOrFalse;
