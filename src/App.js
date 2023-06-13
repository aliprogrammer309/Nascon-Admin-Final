import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import CreateNewBlog from "./pages/blog/CreateNewBlog";
import CreateNewEvent from "./pages/event/CreateNewEvent";
import CreateNewCompetition from "./pages/competition/CreateNewCompetition";
import ManageEvents from "./pages/event/ManageEvents";
import ManageCompetitions from "./pages/competition/ManageCompetitions";
import ManageBlogs from "./pages/blog/ManageBlogs";
import CreateNewUser from "./pages/user/CreateNewUser";
import CreateNewAdmin from "./pages/admin/CreateNewAdmin";
import AskLogin from "./pages/login/AskLogin";
import EventsAdminLogin from "./pages/login/EventsAdminLogin";
import FinanceAdminLogin from "./pages/login/FinanceAdminLogin";
import BlogAdminLogin from "./pages/login/BlogAdminLogin";
import EventsAdminHome from "./pages/home/EventsAdminHome";
import BlogsAdminHome from "./pages/home/BlogsAdminHome";
import FinanceAdminHome from "./pages/home/FinanceAdminHome";
import AddBlog from "./pages/blog/AddBlog";
import AddEvent from "./pages/event/AddEvent";
import AddCompetition from "./pages/competition/AddCompetition";
import Feedback from "./pages/feedback/Feedback";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  // const [home, setHome] = useState("");
  // const location = useLocation();
  // const homeType = location.state.home;
  // setHome(homeType);
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/askLogin" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* {home === "" ? ( */}
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            {/* ) : ( */}

            {/* )} */}
            {/* <Route
            path="eventsAdmin"
              element={
                <RequireAuth>
                  <EventsAdminHome />
                </RequireAuth>
              }
            /> */}
            <Route path="login" element={<Login />} />
            <Route path="eventAdminLogin" element={<EventsAdminLogin />} />
            <Route path="financeAdminLogin" element={<FinanceAdminLogin />} />
            <Route path="blogAdminLogin" element={<BlogAdminLogin />} />
            <Route path="askLogin" element={<AskLogin />} />
            <Route
              path="eventsAdminHome"
              element={
                <RequireAuth>
                  <EventsAdminHome />
                </RequireAuth>
              }
            />

            <Route
              path="blogsAdminHome"
              element={
                <RequireAuth>
                  <BlogsAdminHome />
                </RequireAuth>
              }
            />
            <Route
              path="addBlog"
              element={
                <RequireAuth>
                  <AddBlog />
                </RequireAuth>
              }
            />
            <Route
              path="addEvent"
              element={
                <RequireAuth>
                  <AddEvent />
                </RequireAuth>
              }
            />
            <Route
              path="addCompetition"
              element={
                <RequireAuth>
                  <AddCompetition />
                </RequireAuth>
              }
            />

            <Route
              path="financeAdminHome"
              element={
                <RequireAuth>
                  <FinanceAdminHome />
                </RequireAuth>
              }
            />
            <Route
              path="CreateNewUser"
              element={
                <RequireAuth>
                  <CreateNewUser />
                </RequireAuth>
              }
            />
            <Route
              path="CreateNewAdmin"
              element={
                <RequireAuth>
                  <CreateNewAdmin />
                </RequireAuth>
              }
            />
            <Route
              path="CreateNewBlog"
              element={
                <RequireAuth>
                  <CreateNewBlog />
                </RequireAuth>
              }
            />
            <Route
              path="CreateNewCompetition"
              element={
                <RequireAuth>
                  <CreateNewCompetition />
                </RequireAuth>
              }
            />
            <Route
              path="CreateNewEvent"
              element={
                <RequireAuth>
                  <CreateNewEvent />
                </RequireAuth>
              }
            />
            <Route
              path="ManageEvents"
              element={
                <RequireAuth>
                  <ManageEvents />
                </RequireAuth>
              }
            />
            <Route
              path="ManageCompetitions"
              element={
                <RequireAuth>
                  <ManageCompetitions />
                </RequireAuth>
              }
            />
            <Route
              path="ManageBlogs"
              element={
                <RequireAuth>
                  <ManageBlogs />
                </RequireAuth>
              }
            />
            <Route
              path="Feedback"
              element={
                <RequireAuth>
                  <Feedback />
                </RequireAuth>
              }
            />
            <Route path="user" element={<Single/>}/>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
