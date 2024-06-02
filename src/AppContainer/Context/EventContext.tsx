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

// useEffect(() => {
//   const controller = new AbortController();
//   const fetchUserEvents = async () => {
//     if (store?.currentUser?.id) {
//       const userEvents = await getCurrentUserEvents(
//         store.currentUser.id,
//         controller
//       );
//       store.events = userEvents;
//     }
//   };
//   fetchUserEvents();
//   return () => {
//     controller.abort();
//   };
// }, [store?.currentUser]);
