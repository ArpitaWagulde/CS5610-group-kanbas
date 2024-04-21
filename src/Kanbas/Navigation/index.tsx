import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaRegClock,
  FaDesktop,
  FaQuestionCircle,
  FaCircle,
} from "react-icons/fa";

import { FaC, FaX } from "react-icons/fa6";
const links = [
  { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
  { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
  { label: "Courses", icon: <FaBook className="fs-2" /> },
  { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
  { label: "Inbox", icon: <FaInbox className="fs-2" /> },
  { label: "History", icon: <FaRegClock className="fs-2" /> },
  { label: "Studio", icon: <FaDesktop className="fs-2" /> },
  { label: "Commons", icon: <FaC className="fs-2" /> },
  { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
];

function KanbasNavigation() {
  const { pathname } = useLocation();
  return (
    <>
      <ul className="wd-kanbas-navigation">
        <li style={{ paddingLeft: "0px" }}>
          <a href="http://northeastern.edu">
            <img
              style={{ width: "80px" }}
              src="/images/northeastern_feature.png"
            />
          </a>
        </li>
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/${link.label}`}>
              {" "}
              {link.icon}
              <br /> {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function KanbasMobileNavigation() {
  return (
    <>
      <button
        data-bs-dismiss="offcanvas"
        style={{
          float: "right",
          border: "none",
          background: "none",
          textAlign: "end",
        }}
      >
        <FaX style={{ margin: "20px" }} />
      </button>
      <span style={{ fontSize: "1.3em", color: "red", paddingLeft: "15px" }}>
        <FaCircle /> Kanbas
      </span>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={`/Kanbas/${link.label}`}>
              {" "}
              {link.icon} {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default KanbasNavigation;
export { KanbasMobileNavigation };
