import { useEffect } from "react";
import { useNavigate, useParams, Link,useLocation } from "react-router-dom";
import "./index.css";
import { addQuiz, setQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as service from "../service";
import {Routes, Route, Navigate} from "react-router";
import  DetailsEditor from "./Details";
import QuestionsEditor from "./Questions";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function QuizEditor() {
  const { pathname } = useLocation();
  return(
  <>
  <div className="container-fluid">
  <Tabs
      defaultActiveKey="details"
     
      className="mb-3"
    >
    <Tab eventKey="details" title="Details">
        <DetailsEditor/>
      </Tab>
      <Tab eventKey="questions" title="Questions">
        <QuestionsEditor/>
      </Tab>
    </Tabs>
  </div>
  </>
  );
}
export default QuizEditor;
