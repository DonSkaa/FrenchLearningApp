import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DeckContextProvider from "AppContainer/Context/DeckContext";
import EventContextProvider from "AppContainer/Context/EventContext";
import ExpressionContextProvider from "AppContainer/Context/ExpressionContext";
import UserContextProvider from "AppContainer/Context/UserContext";
import { BrowserRouter } from "react-router-dom";
import UserProgramContextProvider from "AppContainer/Context/UserProgramContext";
import UserMetaContextProvider from "AppContainer/Context/UserMetaContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
