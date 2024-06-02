import { studentMenu, teacherMenu } from "AppConstantes";
import HomePage from "AppContainer/HomePage/HomePage";
import MyStudents from "AppContainer/MyStudents/MyStudents";
import Privacy from "AppContainer/Privacy/Privacy";
import Login from "AppContainer/Profile/Login";
import Profile from "AppContainer/Profile/Profile";
import SignUp from "AppContainer/Profile/SignUp";
import Settings from "AppContainer/Settings/Settings";
import Terms from "AppContainer/Terms/Terms";
import { getCallApi } from "Functions";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./AppContainer/Components/NavBar/NavBar";
import Dashboard from "./AppContainer/Dashboard/Dashboard";
import Flashcards from "./AppContainer/Flashcards/Flashcards";
import Studying from "./AppContainer/Flashcards/Studying";
import Schedule from "./AppContainer/Schedule/Schedule";
import { store } from "./store";

export async function useInitialize() {
  const callApi = getCallApi();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi(`/api/user`, { method: "get" }, null);
        store.currentUser = res.data;
      } catch (error: any) {
        if (error.response.status === 401) {
          store.currentUser = undefined;
          navigate("/");
        }
      }
    })();
  }, []);
}

function App() {
  useInitialize();

  return (
    <div className="flex">
      {store.currentUser ? (
        <NavBar
          menu={
            store.currentUser?.type === "teacher" ? teacherMenu : studentMenu
          }
        />
      ) : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-teacher" element={<SignUp type="teacher" />} />
        {store.currentUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study/:id" element={<Studying />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/students" element={<MyStudents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup-student" element={<SignUp type="student" />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
