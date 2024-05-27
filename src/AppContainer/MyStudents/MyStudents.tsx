import FullScreenPopup from 'AppContainer/Components/FullScreenPopup/FullScreenPopup'
import { UserContext } from 'AppContainer/Context/UserContext'
import SignUp from 'AppContainer/Profile/SignUp'
import { useContext, useEffect, useState } from 'react'

export default function MyStudents(): JSX.Element {

    const [showSignUp, setShowSignUp] = useState(false)
    const userContext = useContext(UserContext)

    const addStudent = () => {
        setShowSignUp(true)
    }

    return (
        <div className="full-width flex center m-4">
            <div className="main-section m-t-40">
                <div className="flex gap-1 m-b-10">
                    <button
                        className='strong-button'
                        onClick={() => addStudent()}
                    >
                        Ajouter un élève
                    </button>
                </div>
                {
                    userContext?.currentStudents
                        ? <div className='flex column gap-1'>
                            {
                                userContext.currentStudents.map((student: any) => {
                                    return (
                                        <div key={student.id} className='array-item'>
                                            <div className='strong'>{student.name}</div>
                                            <div>{student.program_id}</div>
                                            <div>
                                                <button className="light-button">Créer un évènement</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : <div>Il n'y a pas d'élèves pour le moment</div>
                }

                <FullScreenPopup show={showSignUp} onClose={() => setShowSignUp(false)}>
                    <SignUp type='student' setterPopUp={setShowSignUp} />
                </FullScreenPopup>
            </div>
        </div>
    )
}
