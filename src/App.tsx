import { studentMenu, teacherMenu } from "AppConstantes";
import { UserContext } from "AppContainer/Context/UserContext";
import HomePage from "AppContainer/HomePage/HomePage";
import MyStudents from "AppContainer/MyStudents/MyStudents";
import Privacy from "AppContainer/Privacy/Privacy";
import Login from "AppContainer/Profile/Login";
import Profile from "AppContainer/Profile/Profile";
import SignUp from "AppContainer/Profile/SignUp";
import Settings from "AppContainer/Settings/Settings";
import Terms from "AppContainer/Terms/Terms";
import { useCallApi } from "Functions";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./AppContainer/Components/NavBar/NavBar";
import Dashboard from "./AppContainer/Dashboard/Dashboard";
import Flashcards from "./AppContainer/Flashcards/Flashcards";
import Studying from "./AppContainer/Flashcards/Studying";
import Schedule from "./AppContainer/Schedule/Schedule";

function App() {
  const userContext = useContext(UserContext);
  const callApi = useCallApi();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi(`/api/user`, { method: "get" }, null);
        const userData = res.data;
        if (userContext) {
          setIsAuthenticated(true);
          userContext.setCurrentUser(userData);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          navigate("/");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex">
      {isAuthenticated ? (
        <NavBar
          menu={
            userContext?.currentUser?.type === "teacher"
              ? teacherMenu
              : studentMenu
          }
        />
      ) : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setter={setIsAuthenticated} />} />
        <Route path="/signup-teacher" element={<SignUp type="teacher" />} />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route
              path="/profile"
              element={<Profile setter={setIsAuthenticated} />}
            />
            <Route path="/study/:id" element={<Studying />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/students" element={<MyStudents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp type="student" />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
