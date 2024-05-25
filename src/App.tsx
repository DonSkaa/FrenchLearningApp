import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './AppContainer/Dashboard/Dashboard'
import Flashcards from './AppContainer/Flashcards/Flashcards'
import Schedule from './AppContainer/Schedule/Schedule'
import NavBar from './AppContainer/Components/NavBar/NavBar'
import Studying from './AppContainer/Flashcards/Studying'
import Profile from 'AppContainer/Profile/Profile'
import Login from 'AppContainer/Profile/Login'
import { useContext, useEffect } from 'react'
import { UserContext } from 'AppContainer/Context/UserContext'
import { FLA_ENDPOINT } from 'AppConstantes'
import { useCallApi } from 'Functions'
import SignUp from 'AppContainer/Profile/SignUp'
import SecondNavBar from 'AppContainer/Components/SecondNavBar/SecondNavBar'

function App() {

  const userContext = useContext(UserContext)
  const callApi = useCallApi()

  useEffect(() => {
    (async () => {
      try {
        await callApi(`/api/user`, { method: "get" }, null)
          .then(res => {
            const userData = res.data
            if (userContext) {
              userContext.setCurrentUser(userData)
            }
          })
      } catch (error: unknown) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className='flex'>
      <NavBar
        menu={
          [
            { to: "/dashboard", name: "accueil", icon: "/assets/home.png" },
            { to: "/schedule", name: "agenda", icon: "/assets/schedule.png" },
            { to: "/flashcards", name: "fiches", icon: "/assets/flashcards.png" },
            { to: "/profile", name: "profil", icon: "/assets/perfil.png" },
          ]
        }
      />
      <SecondNavBar
        menu={
          [
            { to: "/terms", name: "Conditions d'utilisation" },
            { to: "/privacy", name: "Confidentialité" },
          ]
        }
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/study/:id" element={<Studying />} />
      </Routes>
    </div>
  )
}

export default App
