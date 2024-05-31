import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContext } from "AppContainer/Context/EventContext";
import { CalendarEvent } from "FormattedDatabase";
import { useContext, useEffect, useState } from "react";
import "./Schedule.css";

export default function Schedule(): JSX.Element {
  const { events } = useContext(EventContext);

  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (events && events.length) {
      const formattedEvents = events.map((event) => ({
        ...event,
        id: String(event.id),
      }));
      setUserEvents(formattedEvents);
    }
  }, [events]);

  return (
    <div className="full-width flex center m-4">
      <div className="main-section m-t-40">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          events={userEvents}
          locale={frLocale}
          height={"600px"}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
        />
      </div>
    </div>
  );
}
