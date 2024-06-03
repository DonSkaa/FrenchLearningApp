import { Event, EventPostData } from "FormattedDatabase";
import { getCallApi } from "Functions";
import { store } from "store";

const callApi = getCallApi();

export const addEvent = async (newEvent: EventPostData) => {
  const response = await callApi(`/api/event`, { method: "post" }, null, {
    data: newEvent,
  });
  store.events = store.events
    ? [...store.events, response.data]
    : [response.data];
};

export const getCurrentUserEvents = async (
  userId: number,
  controller: AbortController
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
  return response.data.data as Event[];
};
