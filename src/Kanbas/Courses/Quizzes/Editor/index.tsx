import { useState } from 'react';
import DetailsEditor from "./Details";
import QuestionsEditor from "./Questions";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function QuizEditor() {
  const [activeTab, setActiveTab] = useState('details');
  return (
    <>
      <div className="container-fluid">
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
