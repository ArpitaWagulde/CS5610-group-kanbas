import { useState } from "react";
import DetailsEditor from "./Details";
import QuestionsEditor from "./Questions";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaCheckCircle, FaEllipsisV, FaBan } from "react-icons/fa";
import { KanbasState } from "../../../store";
import { useSelector } from "react-redux";
function QuizEditor() {
  const [activeTab, setActiveTab] = useState("details");
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end wd-quiz-details">
          Points &nbsp;
          {quiz?.points} &nbsp; &nbsp;
          {quiz.published ? (
            <div className="text-success">
              <FaCheckCircle />
              &nbsp; Published
            </div>
          ) : (
            <div>
              <FaBan />
              &nbsp;Not Published
            </div>
          )}
          &nbsp; &nbsp;
          <button className="btn btn-light">
            <FaEllipsisV />
          </button>
        </div>
        <Tabs defaultActiveKey={activeTab} className="mb-3">
          <Tab eventKey="details" title="Details">
            <DetailsEditor />
          </Tab>
          <Tab eventKey="questions" title="Questions">
            <QuestionsEditor />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
export default QuizEditor;
