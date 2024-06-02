import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarEvent } from "FormattedDatabase";
import { useEffect, useState } from "react";
import { store } from "store";
import "./Schedule.css";

export default function Schedule(): JSX.Element {
  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (store.events && store.events.length) {
      const formattedEvents = store.events.map((event) => ({
        ...event,
        id: String(event.id),
      }));
      setUserEvents(formattedEvents);
    }
  }, [store.events]);

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
