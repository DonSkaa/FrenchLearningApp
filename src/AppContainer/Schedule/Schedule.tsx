import './Schedule.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
export default function Schedule(): JSX.Element {


    return (
        <div className="full-width flex center">
            <div className="half-width m-t-40">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                    }}
                    events={[
                        { title: 'Event 1', date: '2024-05-01' },
                        { title: 'Event 2', date: '2024-05-02' },
                    ]}
                    locale={frLocale}
                />
            </div>
        </div>
    )
}