import { useContext } from 'react'
import './Profile.css'
import { UserContext } from 'AppContainer/Context/UserContext'
import Progression from 'AppContainer/Components/Progression/Progression'
import { Link } from 'react-router-dom'

interface ProfileProps {
    setter?: (value: any) => void | null;
}

export default function Profile({ setter }: ProfileProps): JSX.Element {

    const userContext = useContext(UserContext)

    return (
        <div className="full-width flex center m-t-40 m-4 gap-1">
            {
                userContext?.currentUser
                    ? <>
                        <div className='quarter-width'></div>
                        <div className="main-section">
                            <div className='flex-center gap-1 m-b-10'>
                                <h2 className='left'>{userContext.currentUser.name}</h2>
                                <Link to='/settings'>
                                    <img src="assets/settings.png" alt="" />
                                </Link>
                            </div>
                            {
                                userContext.currentUser.type === 'student'
                                    ? <Progression />
                                    : null
                            }
                        </div>
                        <div className='quarter-width right'>
                        </div>
                    </>
                    : null
            }
        </div>
    )
}