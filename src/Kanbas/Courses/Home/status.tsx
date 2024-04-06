import {
  FaFileImport,
  FaC,
  FaCrosshairs,
  FaChartSimple,
  FaBullhorn,
  FaBell,
  FaBan,
  FaRegCalendar,
  FaX,
} from "react-icons/fa6";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { coursestatus } from "../../Database";

function CourseStatus() {
  const { courseId } = useParams();
  const courseList = coursestatus.filter(
    (course) => course.course === courseId
  );
  const Buttonlist = [
    {
      label: "Import Existing Content",
      icon: <FaFileImport className="fs-5" />,
    },
    {
      label: "Import From Commons",
      icon: <FaC className="fs-5" />,
    },
    { label: "Choose Home Page", icon: <FaCrosshairs className="fs-5" /> },
    {
      label: "View Course Stream",
      icon: <FaChartSimple className="fs-5" />,
    },
    { label: "New Announcement", icon: <FaBullhorn className="fs-5" /> },
    { label: "New Analytics", icon: <FaChartSimple className="fs-5" /> },
    {
      label: "View Course Notifications",
      icon: <FaBell className="fs-5" />,
    },
  ];
  return (
    <>
      <h5>Course Status</h5>
      <button type="button" className="btn btn-light">
        <FaBan /> Unpublish
      </button>
      <button
        style={{ backgroundColor: "green", color: "white" }}
        type="button"
        className="btn mx-2"
      >
        <FaCheckCircle /> Published
      </button>
      <br />
      <br />
      <ul className="list-group">
        {Buttonlist.map((link, index) => (
          <li key={index} className="list-group-item btn btn-light">
            <Link to="#">
              {" "}
              {link.icon} {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      {courseList.map((course) => (
        <>
          <h5>To Do</h5>
          <hr />
          <ul style={{ listStyleType: "none", paddingInlineStart: "0px" }}>
            {course.todo?.map((todoItem) => (
              <li style={{ color: "red" }}>
                <span>
                  <FaInfoCircle
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                  />
                  {todoItem.name}
                  <div style={{ float: "right" }}>
                    <FaX style={{ color: "black", margin: "5px" }} />
                  </div>
                  <br />
                  <small style={{ color: "black", marginLeft: "30px" }}>
                    {todoItem.points} points * {todoItem.due}
                  </small>
                </span>
              </li>
            ))}
          </ul>
          <br />
          <h5>
            Comming Up
            <div style={{ float: "right" }}>
              <FaRegCalendar
                style={{ fontSize: "smaller", marginRight: "5px" }}
              />
              <a href="#">
                <small style={{ fontSize: "smaller" }}>View Calendar</small>
              </a>
            </div>
          </h5>
          <hr />
          <ul className="wd-coming-up-list">
            {course.comingUp?.map((item) => (
              <li className="list-group-item">
                <FaRegCalendar
                  style={{ fontSize: "smaller", marginRight: "5px" }}
                />
                <a href="#">{item.type}</a>
                <br />
                <small>{item.description}</small>
                <br />
                <small>{item.time}</small>
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
}

export default CourseStatus;
