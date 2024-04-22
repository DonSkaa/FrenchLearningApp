import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyAccount from './AppContainer/Login/MyAccount';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
