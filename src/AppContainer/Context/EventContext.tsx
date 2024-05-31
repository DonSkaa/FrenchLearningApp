import { Event, EventPostData } from "FormattedDatabase";
import { useCallApi } from "Functions";
import { createContext, useEffect, useState } from "react";
import { store } from "store";

interface EventContextType {
  events: Event[];
  addEvent: (newEvent: EventPostData) => void;
}

export const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
});

function EventContextProvider(props: React.PropsWithChildren<{}>) {
  const [events, setEvents] = useState<Event[]>([]);

  const callApi = useCallApi();

  const addEvent = async (newEvent: EventPostData) => {
    callApi(`/api/event`, { method: "post" }, null, { data: newEvent }).then(
      (res) => {
        events ? setEvents([...events, res.data]) : setEvents([res.data]);
      }
    );
  };

  const getCurrentUserEvents = async (
    userId: number,
    controller: any
  ): Promise<Event[]> => {
    const currentUserId =
      store?.currentUser?.type === "teacher"
        ? { teacher_id: userId }
        : { user_id: userId };
    const response = await callApi(
      `/api/events`,
      { method: "get" },
      controller.signal,
      currentUserId
    );
    return response.data.data;
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchUserEvents = async () => {
      if (store?.currentUser?.id) {
        const userEvents = await getCurrentUserEvents(
          store.currentUser.id,
          controller
        );
        setEvents(userEvents);
      }
    };
    fetchUserEvents();
    return () => {
      controller.abort();
    };
  }, [store?.currentUser]);

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {props.children}
    </EventContext.Provider>
  );
}

export default EventContextProvider;
