import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DeckContextProvider from 'AppContainer/Context/DeckContext';
import EventContextProvider from 'AppContainer/Context/EventContext';
import UserProgramContextProvider from 'AppContainer/Context/UserProgramContext';
import ExpressionContextProvider from 'AppContainer/Context/ExpressionContext';
// import UserContextProvider from 'AppContainer/Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <UserContextProvider>
  <UserProgramContextProvider>
    <ExpressionContextProvider>
      <EventContextProvider>
        <DeckContextProvider>
          <App />
        </DeckContextProvider>
      </EventContextProvider>
    </ExpressionContextProvider>
  </UserProgramContextProvider>
  // </UserContextProvider>
)
