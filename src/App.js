import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyAccount from './AppContainer/Login/MyAccount';
import Dashboard from './AppContainer/Dashboard/Dashboard';
import FlashCards from './AppContainer/Flashcards/Flaschards';
import Schedule from './AppContainer/Schedule/Schedule';
import Account from './AppContainer/Account/Account';
import NavBar from './AppContainer/Components/NavBar/NavBar';
import Studying from 'AppContainer/Flashcards/Studying';

function App() {
  return (
    <div className='flex'>
      <BrowserRouter>
        <NavBar menu={
          [
            { to: "/dashboard", name: "accueil" },
            { to: "/schedule", name: "agenda" },
            { to: "/flashcards", name: "fiches" },
            { to: "/account", name: "profil" },
          ]
        } />
        <Routes>
          {/* <Route path="/" element={<MyAccount />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/account" element={<Account />} />
          <Route path="/study:id" element={<Studying />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
