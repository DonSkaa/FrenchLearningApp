import { UserContext } from 'AppContainer/Context/UserContext'
import { UserProgramContext } from 'AppContainer/Context/UserProgramContext'
import { calculateProgress } from 'Functions'
import { useContext, useEffect, useState } from 'react'

export default function Progression(): JSX.Element {

    const [progress, setProgress] = useState<number | null>(null)
    const userProgram = useContext(UserProgramContext)

    useEffect(() => {
        if (userProgram?.currentUserProgram) {
            const currentUserProgram = userProgram.currentUserProgram
            setProgress(calculateProgress(currentUserProgram.start_date, currentUserProgram.end_date))
        }
    }, [userProgram?.currentUserProgram])

    return (
        <div>
            {
                userProgram?.currentUserProgram && progress
                    ? <div className="flex column gap-1">
                        <div className="progression-cursor">
                            <h3 className="m-0 left">Progression programme</h3>
                            <div className="flex-center gap-1">
                                <div className="cursor-container">
                                    <div className="cursor" style={{ width: `${progress}%` }}></div>
                                </div>
                                <div>{progress}%</div>
                            </div>
                        </div>
                    </div>
                    : <div>Pas de programme en cours</div>
            }
        </div>
    )
}