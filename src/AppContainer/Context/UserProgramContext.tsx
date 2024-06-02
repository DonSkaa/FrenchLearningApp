import { getCallApi } from "Functions";
import { store } from "store";

export const getCurrentUserProgram = async () => {
  const callApi = getCallApi();
  if (store.currentUser?.type === "teacher") {
    return (store.currentUserProgram = undefined);
  }

  const response = await callApi(`/api/user-program`, { method: "get" }, null, {
    user_id: store.currentUser?.id,
  });
  return (store.currentUserProgram = response.data.data);
};
