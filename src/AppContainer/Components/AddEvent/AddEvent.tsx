import { FormEvent, useContext, useEffect, useState } from "react"
import EventFields from "./EventFields"
import { EventContext } from "AppContainer/Context/EventContext"
import { EventPostData, User } from "FormatedDatabase"

interface EventFieldsProps {
    student: User;
}

export default function AddEvent({ student }: EventFieldsProps): JSX.Element {

    const [newEvent, setNewEvent] = useState<EventPostData>({} as EventPostData)
    const { addEvent } = useContext(EventContext)

    useEffect(() => {
        setNewEvent({
            event_type: 'lesson',
            date: '',
            start: '',
            end: '',
            user_id: student.id,
            teacher_id: student.teacher_id,
            meeting_link: '',
        })
    }, [student])

    const sendNewEvent = async (newEvent: EventPostData, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addEvent(newEvent)
    }

    return (
        <div className="full-width flex center m-4">
            <form onSubmit={(e) => sendNewEvent(newEvent, e)}>
                <EventFields
                    newEvent={newEvent}
                    setter={setNewEvent}
                />
                <button className="strong-button m-t-10">Valider</button>
            </form>
        </div>
    )
}
