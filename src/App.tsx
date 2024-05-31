import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./AppContainer/Dashboard/Dashboard";
import Flashcards from "./AppContainer/Flashcards/Flashcards";
import Schedule from "./AppContainer/Schedule/Schedule";
import NavBar from "./AppContainer/Components/NavBar/NavBar";
import Studying from "./AppContainer/Flashcards/Studying";
import Profile from "AppContainer/Profile/Profile";
import Login from "AppContainer/Profile/Login";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "AppContainer/Context/UserContext";
import { studentMenu, teacherMenu } from "AppConstantes";
import { useCallApi } from "Functions";
import Privacy from "AppContainer/Privacy/Privacy";
import Terms from "AppContainer/Terms/Terms";
import SignUp from "AppContainer/Profile/SignUp";
import MyStudents from "AppContainer/MyStudents/MyStudents";
import Settings from "AppContainer/Settings/Settings";
import HomePage from "AppContainer/HomePage/HomePage";
import { DeckContext } from "AppContainer/Context/DeckContext";
import { EventContext } from "AppContainer/Context/EventContext";
import { UserProgramContext } from "AppContainer/Context/UserProgramContext";
import { observer } from "mobx-react-lite";
import { store } from "./store";

function App2() {
  const userContext = useContext(UserContext);
  const deckContext = useContext(DeckContext);
  const eventContext = useContext(EventContext);
  const userProgramContext = useContext(UserProgramContext);
  const callApi = useCallApi();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi(`/api/user`, { method: "get" }, null);
        const userData = res.data;
        // if (userContext) {
        // setIsAuthenticated(true);
        // userContext.setCurrentUser(userData);
        // }
        if (store.currentUser) {
          setIsAuthenticated(true);
          store.setCurrentUser(userData);
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
      console.log("currentUser", userContext.currentUser);
      console.log("currentStudents", userContext.currentStudents);
      console.log("decks", deckContext.decks);
      console.log("events", eventContext.events);
      console.log("userProgram", userProgramContext.currentUserProgram);
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex">
      {isAuthenticated ? (
        <NavBar
          menu={
            store.currentUser?.type === "teacher" ? teacherMenu : studentMenu
            // userContext?.currentUser?.type === "teacher"
            //   ? teacherMenu
            //   : studentMenu
          }
        />
      ) : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setter={setIsAuthenticated} />} />
        <Route
          path="/signup-teacher"
          element={<SignUp type="teacher" setter={setIsAuthenticated} />}
        />
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
            <Route
              path="/settings"
              element={<Settings setter={setIsAuthenticated} />}
            />
            <Route path="/signup-student" element={<SignUp type="student" />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

const App = observer(() => {
  return (
    <App2 />
    // <div>
    //   Name: {store.user.name}
    //   <div
    //     onClick={() => {
    //       action(() => {
    //         store.user.name = "Donatello";
    //         store.user.name = "Donatello";
    //         store.user.name = "Donatello";
    //         store.user.name = "Donatello";
    //         store.user.name = "Donatello";
    //       })();
    //       // store.setName("Donatello");
    //     }}
    //   >
    //     CLICK
    //   </div>
    // </div>
  );
});

export default App;
