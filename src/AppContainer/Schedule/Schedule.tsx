import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { observer } from "mobx-react-lite";
import { store } from "store";
import "./Schedule.css";

interface EventInfos {
  event: {
    _def: {
      title: string;
      extendedProps: {
        start: string;
        end: string;
        user: {
          name: string;
        };
      };
    };
  };
}

const renderEventContent = (eventInfos: EventInfos) => {
  const formatedEvent = eventInfos.event._def;

  return (
    <div className="schedule-item">
      <div className="flex gap-1">
        <div>
          {new Date(formatedEvent.extendedProps.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {""}-{""}
          {new Date(formatedEvent.extendedProps.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div>{formatedEvent.title}</div>
      </div>
      <div>{formatedEvent.extendedProps.user?.name}</div>
    </div>
  );
};

export const Schedule = observer(function Schedule(): JSX.Element {
  return (
    <>
      <div className="full-width flex center m-4">
        <div className="full-width">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={store.events?.map((event) => ({
              ...event,
              id: String(event.id),
              extendedProps: {
                user: event.user,
                start: event.start,
                end: event.end,
              },
            }))}
            eventContent={renderEventContent}
            locale={frLocale}
            height={"600px"}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
          />
        </div>
      </div>
    </>
  );
});
