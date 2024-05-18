import { useContext } from 'react'
import './Profile.css'
import { UserContext } from 'AppContainer/Context/UserContext'

export default function Profile(): JSX.Element {

    const userContext = useContext(UserContext)

    return (
        <div className="full-width flex center m-t-40">
            {userContext?.currentUser
                ? <>
                    <div className='quarter-width'></div>
                    <div className="half-width">
                        <div className="picture-container">
                        </div>
                        <h2 className='left'>{userContext.currentUser.name}</h2>
                    </div>
                    <div className='quarter-width right'>
                        <button className='default-button'>
                            <img src="settings.svg" alt="" />
                        </button>
                    </div>
                </>
                : null}
        </div>
    )
}