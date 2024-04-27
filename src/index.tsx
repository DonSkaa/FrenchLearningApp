import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DeckContextProvider from 'AppContainer/Context/DeckContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <DeckContextProvider>
    <App />
  </DeckContextProvider>
);
