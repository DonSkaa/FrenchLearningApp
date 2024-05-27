import { useContext, useEffect } from 'react'
import './Profile.css'
import { UserContext } from 'AppContainer/Context/UserContext'
import Progression from 'AppContainer/Components/Progression/Progression'

export default function Profile(): JSX.Element {

    const userContext = useContext(UserContext)

    return (
        <div className="full-width flex center m-t-40 m-4">
            {userContext?.currentUser
                ? <>
                    <div className='quarter-width'></div>
                    <div className="main-section">
                        <div className="picture-container">
                        </div>
                        <h2 className='left'>{userContext.currentUser.name}</h2>
                        <Progression />
                    </div>
                    <div className='quarter-width right'>
                        <button className='default-button'>
                            <img src="assets/settings.png" alt="" />
                        </button>
                    </div>
                </>
                : null}
        </div>
    )
}