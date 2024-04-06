import ModuleList from "../Modules/List";
import "./index.css";
import CourseStatus from "./status";

function Home() {
  return (
    <>
      <div className="flex-fill">
        <ModuleList />
      </div>
      <div
        className="wd-course-status flex-grow-0 me-2 d-none d-lg-block"
        style={{ width: "300px" }}
      >
        <CourseStatus />
      </div>
    </>
  );
}
export default Home;
