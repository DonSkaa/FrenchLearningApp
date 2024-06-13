import { Event, EventPostData } from "FormattedDatabase";
import { getCallApi, getTimezone } from "Functions";
import { store } from "store";

const callApi = getCallApi();
const timezone = getTimezone();

export const addEvent = async (newEvent: EventPostData) => {
  const response = await callApi(`/api/event`, { method: "post" }, null, {
    data: { ...newEvent, timezone: timezone },
  });
  store.events = store.events
    ? ([...store.events, response.data] as Event[])
    : ([response.data] as Event[]);
};

export const getCurrentUserEvents = async (
  userId: number,
  controller: AbortController
): Promise<Event[]> => {
  const currentUserId =
    store?.currentUser?.type === "teacher"
      ? { teacher_id: userId }
      : { user_id: userId };
  const response: { data: { data: Event[] } } = await callApi(
    `/api/events`,
    { method: "get" },
    controller.signal,
    { ...currentUserId, timezone: timezone }
  );
  return response.data.data;
};
