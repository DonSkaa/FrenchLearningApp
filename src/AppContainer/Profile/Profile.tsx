import './Profile.css'

export default function Profile(): JSX.Element {
    return (
        <div className="full-width flex center m-t-40">
            <div className='quarter-width'></div>
            <div className="half-width">
                <div className="picture-container">
                </div>
                <h2 className='left'>Jean Dupont</h2>
            </div>
            <div className='quarter-width right'>
                <button className='default-button'>
                    <img src="settings.svg" alt="" />
                </button>
            </div>
        </div>
    )
}