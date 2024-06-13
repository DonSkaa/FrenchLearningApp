import { getCallApi } from "Functions";
import { store } from "store";

const callApi = getCallApi();

export const getCurrentStudents = async (
  teacherId: number,
  offset: number,
  limit: number,
  controller: AbortController
) => {
  const response = await callApi(
    `api/users`,
    { method: "get" },
    controller.signal,
    {
      teacher_id: teacherId,
      offset,
      limit,
    }
  );
  return response.data;
};

export const loadMoreStudents = async (): Promise<void> => {
  if (store.currentUser && store.limit) {
    const newOffset = store.offset + store.limit;
    const controller = new AbortController();
    const response = await getCurrentStudents(
      store.currentUser.id,
      newOffset,
      store.limit,
      controller
    );
    store.currentStudents = store.currentStudents
      ? [...store.currentStudents, ...response.data]
      : response.data;
    store.offset = newOffset;
    store.totalItems = response.data.totalItems;
  }
};

export const logOut = async () => {
  try {
    await callApi(`/api/logout`, { method: "post" });
    store.logout();
    window.location.href = "/";
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur", error);
  }
};
