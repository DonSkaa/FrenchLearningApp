import { useContext, useEffect, useState } from "react"
import "./Dashboard.css"
import { user, user_program, program, event, Thematic } from "FormatedDatabase"
import { calculateProgress, calculateWeek } from "Functions"
import EventItem from "../Components/EventItem/EventItem"
import Expression from "AppContainer/Expression/Expression"
import { EventContext } from "AppContainer/Context/EventContext"

export default function Dashboard() {

    const { events } = useContext(EventContext)
    const [progress, setProgress] = useState<number | null>(null)
    const [currentThematic, setCurrentThematic] = useState<Thematic | undefined>(undefined)

    const currentUserId = 1
    const currentUser = user.find(user => user.id === currentUserId)
    const currentUserPrograms = user_program.filter(program => program.id === currentUser?.user_program_id)
    const activeCurrentUserProgram = currentUserPrograms.find(program => program.status)
    const currentProgram = program.find(program => program.id === activeCurrentUserProgram?.program_id)
    const formatedUser = { ...currentUser, user_program: { ...activeCurrentUserProgram, program: currentProgram } }

    useEffect(() => {
        if (formatedUser.user_program.start_date && formatedUser.user_program.end_date) {
            const currentWeek = calculateWeek(formatedUser.user_program.start_date)
            setCurrentThematic(formatedUser.user_program.program?.thematics.find(thematic => thematic.week_number === currentWeek))
            setProgress(calculateProgress(formatedUser.user_program.start_date, formatedUser.user_program.end_date))
        }
    }, [formatedUser])

    return (
        <div className="full-width flex center gap-3">
            <div className="half-width m-t-40">
                {
                    formatedUser.user_program && progress
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
                            {currentThematic
                                ? <div className="flex grey-bg strong">
                                    <div>Bloc de la semaine :</div>
                                    <div className="primary-color">{currentThematic.name}</div>
                                </div>
                                : null
                            }
                        </div>
                        : <div>Pas de programme en cours</div>
                }
                <h2 className="left m-t-25">Tâches du jour</h2>
                <div className="flex column gap-1">
                    {events
                        .filter(event => new Date(event.end) > new Date())
                        .map(event => {
                            return (
                                <div key={event.id}>
                                    <EventItem event={event} />
                                </div>
                            )
                        })}
                </div>
                <h2 className="left m-t-25">Agenda</h2>
            </div>
            <div className="quarter-width m-t-40">
                <Expression />
            </div>
        </div>
    )
}