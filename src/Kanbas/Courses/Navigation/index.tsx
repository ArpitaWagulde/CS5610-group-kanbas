import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaBullhorn,
  FaCircleNodes,
  FaClipboardCheck,
  FaComments,
  FaFile,
  FaFilePen,
  FaFolder,
  FaGear,
  FaHouse,
  FaPeopleArrows,
  FaRocket,
  FaUserGroup,
} from "react-icons/fa6";
import { FaPlug } from "react-icons/fa";
const links = [
  { label: "Home", icon: <FaHouse className="fs-2" /> },
  { label: "Modules", icon: <FaCircleNodes className="fs-2" /> },
  { label: "Piazza", icon: <FaPlug className="fs-2" /> },
  { label: "Zoom Meetings", icon: <FaPlug className="fs-2" /> },
  { label: "Assignments", icon: <FaFilePen className="fs-2" /> },
  { label: "Quizes", icon: <FaRocket className="fs-2" /> },
  { label: "Grades", icon: <FaClipboardCheck className="fs-2" /> },
  { label: "People", icon: <FaUserGroup className="fs-2" /> },
  { label: "Panopto Video", icon: <FaPlug className="fs-2" /> },
  { label: "Discussions", icon: <FaComments className="fs-2" /> },
  { label: "Announcements", icon: <FaBullhorn className="fs-2" /> },
  { label: "Pages", icon: <FaFile className="fs-2" /> },
  { label: "Files", icon: <FaFolder className="fs-2" /> },
  { label: "Rubrics", icon: <FaPlug className="fs-2" /> },
  { label: "Outcomes", icon: <FaPlug className="fs-2" /> },
  { label: "Collaborations", icon: <FaPeopleArrows className="fs-2" /> },
  { label: "Syllabus", icon: <FaPlug className="fs-2" /> },
  { label: "Settings", icon: <FaGear className="fs-2" /> },
];

function CourseNavigation() {
  const { pathname } = useLocation();
  return (
    <>
      <ul className="wd-navigation">
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={link.label}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function CourseMobileNavigation() {
  return (
    <>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.label}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CourseNavigation;
export { CourseMobileNavigation };
