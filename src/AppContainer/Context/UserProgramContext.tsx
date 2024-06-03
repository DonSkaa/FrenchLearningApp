import { UserProgram } from "FormattedDatabase";
import { getCallApi } from "Functions";
import { store } from "store";

export const getCurrentUserProgram = async (): Promise<
  UserProgram | undefined
> => {
  const callApi = getCallApi();
  if (store.currentUser?.type === "teacher") {
    return (store.currentUserProgram = undefined);
  }

  const response = await callApi(`/api/user-program`, { method: "get" }, null, {
    user_id: store.currentUser?.id,
  });
  return (response.data as { data: UserProgram }).data;
};
