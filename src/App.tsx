import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './AppContainer/Dashboard/Dashboard'
import Flashcards from './AppContainer/Flashcards/Flashcards'
import Schedule from './AppContainer/Schedule/Schedule'
import NavBar from './AppContainer/Components/NavBar/NavBar'
import Studying from './AppContainer/Flashcards/Studying'
import Profile from 'AppContainer/Profile/Profile'
import Login from 'AppContainer/Profile/Login'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'AppContainer/Context/UserContext'
import { FLA_ENDPOINT, studentMenu, teacherMenu } from 'AppConstantes'
import { useCallApi } from 'Functions'
import Privacy from 'AppContainer/Privacy/Privacy'
import Terms from 'AppContainer/Terms/Terms'
import SignUp from 'AppContainer/Profile/SignUp'
import MyStudents from 'AppContainer/MyStudents/MyStudents'

function App() {

  const userContext = useContext(UserContext)
  const callApi = useCallApi()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await callApi(`/api/user`, { method: "get" }, null)
          .then(res => {
            const userData = res.data
            if (userContext) {
              setIsAuthenticated(true)
              userContext.setCurrentUser(userData)
            } else {
              setIsAuthenticated(false)
            }
          })
      } catch (error: unknown) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <div className='flex'>
      {isAuthenticated
        ? <NavBar
          menu={userContext?.currentUser?.type === 'teacher' ? teacherMenu : studentMenu}
        />
        : null}
      <Routes>
        <Route path="/" element={
          <Login setter={setIsAuthenticated} />
          // <SignUp setter={setIsAuthenticated} />
        } />
        {isAuthenticated
          ? <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/profile" element={<Profile setter={setIsAuthenticated} />} />
            <Route path="/study/:id" element={<Studying />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/students" element={<MyStudents />} />
            <Route path="/signup" element={<SignUp type='student' />} />
          </>
          : null
        }
      </Routes>
    </div>
  )
}

export default App
