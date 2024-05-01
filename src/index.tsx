import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DeckContextProvider from 'AppContainer/Context/DeckContext';
import EventContextProvider from 'AppContainer/Context/EventContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <EventContextProvider>
    <DeckContextProvider>
      <App />
    </DeckContextProvider>
  </EventContextProvider>
);
