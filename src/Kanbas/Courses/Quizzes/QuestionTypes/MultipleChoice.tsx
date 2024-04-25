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

function MultipleChoice() {
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

    const addOption = () => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-container';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'correct-answer'; 

        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.className = 'form-control w-25 option-text';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary edit-button';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger delete-button';

        optionContainer.appendChild(radioButton);
        optionContainer.appendChild(optionInput);
        optionContainer.appendChild(editButton);
        optionContainer.appendChild(deleteButton);
    
        document.getElementById('answers')?.appendChild(optionContainer);
    };
    

    return (
        <div className="wd-asmt-edit-home flex-fill">
            <br />
            <hr />
            <br />
            Enter your questions and multiple answers, then select the one correct answer.
          
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
            <div id="answers">
            <Button className="transparent-button" onClick={addOption}> + Add Another Answer</Button>
            <br></br>
            </div>
            {/* <Button className="btn btn-success">
                Update Question
              </Button>
              <Button className="btn btn-danger">
               
                Discard Changes
              </Button> */}
        </div>
    );
}
export default MultipleChoice;
