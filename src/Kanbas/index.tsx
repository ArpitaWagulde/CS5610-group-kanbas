import Account from "./Account";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import "./style.css";
import Courses from "./Courses";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const axiosWithCredentials = axios.create({
  baseURL: `${COURSES_API}`,
  withCredentials: true,
});

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const findAllCourses = async () => {
    const response = await axiosWithCredentials.get(``);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);
  const [course, setCourse] = useState({
    id: "1234",
    name: "New Course",
    number: "CS9999",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "plain-blue.jpeg",
  });
  const addNewCourse = async () => {
    const response = await axiosWithCredentials.post(``, course);
    setCourses([...courses, response.data]);
  };
  const deleteCourse = async (courseId: any) => {
    const response = await axiosWithCredentials.delete(`/${courseId}`);
    setCourses(courses.filter((course) => course.id !== courseId));
  };
  const updateCourse = async () => {
    const response = await axiosWithCredentials.put(`/${course.id}`, course);
    setCourses(
      courses.map((c) => {
        if (c.id === course.id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <>
      <Provider store={store}>
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <div className="d-none d-md-block">
            <KanbasNavigation />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="Dashboard"
                element={
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                }
              />
              <Route path="Courses/:courseId/*" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default Kanbas;
