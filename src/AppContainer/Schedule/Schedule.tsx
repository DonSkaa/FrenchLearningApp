import './Schedule.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { useContext, useEffect, useState } from 'react';
import { EventContext } from 'AppContainer/Context/EventContext';
import { CalendarEvent } from 'FormatedDatabase'

export default function Schedule(): JSX.Element {

    const { events } = useContext(EventContext)

    const [userEvents, setUserEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        if (events && events.length) {
            const formatedEvents = events.map(event => ({ ...event, id: String(event.id) }))
            setUserEvents(formatedEvents)
        }
    }, [events])

    return (
        <div className="full-width flex center">
            <div className="three-quarter-width m-t-40">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                    }}
                    events={userEvents}
                    locale={frLocale}
                    height={"600px"}
                />
            </div>
        </div>
    )
}