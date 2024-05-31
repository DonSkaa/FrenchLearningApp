import { useCallApi } from "Functions";
import { store } from "store";

const controller = new AbortController();
const callApi = useCallApi();

export const getCurrentUserProgram = async () => {
  if (store.currentUser?.type === "teacher") {
    return (store.currentUserProgram = []);
  }

  const response = await callApi(
    `/api/user-program`,
    { method: "get" },
    controller.signal,
    { user_id: store.currentUser?.id }
  );
  return (store.currentUserProgram = response.data.data);
};
