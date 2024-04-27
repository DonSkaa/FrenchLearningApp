import { useEffect, useState } from "react"
import "./Dashboard.css"
import { user, user_program, event } from "FormatedDatabase"
import { calculateProgress } from "Functions"
import EventItem from "../Components/EventItem/EventItem"

export default function Dashboard() {

    const [progress, setProgress] = useState<number | null>(null)

    const currentUserId = 1
    const currentUser = user.find(user => user.id === currentUserId)
    const currentUserPrograms = user_program.filter(program => program.id === currentUser?.user_program_id)
    const activeCurrentUserProgram = currentUserPrograms.find(program => program.status)
    const formatedUser = { ...currentUser, user_program: activeCurrentUserProgram }

    useEffect(() => {
        if (formatedUser.user_program) {
            setProgress(calculateProgress(formatedUser.user_program.start_date, formatedUser.user_program.end_date))
        }
    }, [formatedUser])

    return (
        <div className="full-width flex center">
            <div className="half-width m-t-40">
                {
                    activeCurrentUserProgram && progress
                        ? <div className="progression-cursor">
                            <h3 className="m-0 left">Progression programme</h3>
                            <div className="flex-center gap-1">
                                <div className="cursor-container">
                                    <div className="cursor" style={{ width: `${progress}%` }}></div>
                                </div>
                                <div>{progress}</div>
                            </div>
                        </div>
                        : <div>Pas de programme en cours</div>
                }
                <h2 className="left">Tâches du jour</h2>
                <div className="flex column gap-1">
                    {event?.map(event => {
                        return (
                            <div key={event.id}>
                                <EventItem event={event} />
                            </div>
                        )
                    })}
                </div>
                <h2 className="left">Agenda</h2>
            </div>
        </div>
    )
}