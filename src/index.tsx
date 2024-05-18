import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DeckContextProvider from 'AppContainer/Context/DeckContext';
import EventContextProvider from 'AppContainer/Context/EventContext';
import ExpressionContextProvider from 'AppContainer/Context/ExpressionContext';
import UserContextProvider from 'AppContainer/Context/UserContext';
import PopupContextProvider from 'AppContainer/Context/PopupContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <PopupContextProvider>
      <UserContextProvider>
        <ExpressionContextProvider>
          <EventContextProvider>
            <DeckContextProvider>
              <App />
            </DeckContextProvider>
          </EventContextProvider>
        </ExpressionContextProvider>
      </UserContextProvider>
    </PopupContextProvider>
  </BrowserRouter>
)
