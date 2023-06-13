import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faTrophy } from "@fortawesome/free-solid-svg-icons";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NasCon Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          {/* <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          <p className="title">CREATE NEW</p>
          <Link to="/CreateNewAdmin" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Admin</span>
            </li>
          </Link>
          <Link to="/CreateNewUser" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>User</span>
            </li>
          </Link>
          <Link to="/CreateNewBlog" style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon
                icon={faBlog}
                className="icon"
                style={{ fontSize: "16px" }}
              />
              <span>Blog</span>
            </li>
          </Link>
          <Link to="/CreateNewCompetition" style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon
                icon={faTrophy}
                className="icon"
                style={{ fontSize: "16px" }}
              />
              <span>Competition</span>
            </li>
          </Link>
          <Link to="/CreateNewEvent" style={{ textDecoration: "none" }}>
            <li>
              <EventOutlinedIcon className="icon" />
              <span>Event</span>
            </li>
          </Link>
          <p className="title">MANAGE</p>

          <Link to="/ManageBlogs" style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon
                icon={faBlog}
                className="icon"
                style={{ fontSize: "16px" }}
              />
              <span>Blogs</span>
            </li>
          </Link>
          <Link to="/ManageCompetitions" style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon
                icon={faTrophy}
                className="icon"
                style={{ fontSize: "16px" }}
              />
              <span>Competitions</span>
            </li>
          </Link>
          <Link to="/ManageEvents" style={{ textDecoration: "none" }}>
            <li>
              <EventOutlinedIcon className="icon" />
              <span>Events</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/Feedback" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Feedback</span>
            </li>
          </Link>
          <li onClick={() => dispatch({ type: "LOGOUT" })}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
