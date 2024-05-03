import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './AppContainer/Dashboard/Dashboard';
import Flashcards from './AppContainer/Flashcards/Flashcards';
import Schedule from './AppContainer/Schedule/Schedule';
import NavBar from './AppContainer/Components/NavBar/NavBar';
import Studying from './AppContainer/Flashcards/Studying';
import Profile from 'AppContainer/Profile/Profile';

function App() {
  return (
    <div className='flex'>
      <BrowserRouter>
        <NavBar menu={
          [
            { to: "/dashboard", name: "accueil" },
            { to: "/schedule", name: "agenda" },
            { to: "/flashcards", name: "fiches" },
            { to: "/profile", name: "profil" },
          ]
        } />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/study/:id" element={<Studying />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
