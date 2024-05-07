import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DeckContextProvider from 'AppContainer/Context/DeckContext';
import EventContextProvider from 'AppContainer/Context/EventContext';
import UserProgramContextProvider from 'AppContainer/Context/UserProgramContext';
import ExpressionContextProvider from 'AppContainer/Context/ExpressionContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <UserProgramContextProvider>
    <ExpressionContextProvider>
      <EventContextProvider>
        <DeckContextProvider>
          <App />
        </DeckContextProvider>
      </EventContextProvider>
    </ExpressionContextProvider>
  </UserProgramContextProvider>
);
