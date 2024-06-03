import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { observer } from "mobx-react-lite";
import { store } from "store";
import "./Schedule.css";

export const Schedule = observer(function Schedule(): JSX.Element {
  return (
    <>
      {store.events?.length ? (
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
              events={store.events.map((event) => ({
                ...event,
                id: String(event.id),
              }))}
              locale={frLocale}
              height={"600px"}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
            />
          </div>
        </div>
      ) : null}
    </>
  );
});
