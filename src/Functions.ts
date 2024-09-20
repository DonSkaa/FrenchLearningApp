import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Card,
  Deck,
  Event,
  EventPostData,
  Expression,
  UserMeta,
  UserProgram,
} from "Interfaces";
import { store } from "store";

axios.defaults.withCredentials = true;
interface CallApiOptions extends AxiosRequestConfig {
  method?: "get" | "post" | "put" | "delete";
}

const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await axios.get("/api/csrf-token", {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Erreur lors de la récupération du token CSRF:", error);
    throw new Error("CSRF token non récupéré.");
  }
};

export const getCallApi = () => {
  const callApi = async (
    uri: string,
    options: CallApiOptions = { method: "get" },
    abortSignal?: AbortSignal | null,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<any>> => {
    const APIoptions: CallApiOptions = {
      ...options,
      signal: abortSignal ?? undefined,
      headers: {
        ...options.headers,
      },
      url: uri,
      withCredentials: true,
    };

    APIoptions.headers = APIoptions.headers ?? {};

    if (options.method !== "get") {
      const csrfToken = await getCsrfToken();
      APIoptions.headers["csrf-token"] = csrfToken;
    }

    if (options.method === "get") {
      APIoptions.params = data;
    } else {
      APIoptions.data = data;
    }

    return axios(APIoptions);
  };
  return callApi;
};

export function isToday(dateString: string): boolean {
  const today = new Date();

  const formattedToday = today.toISOString().split("T")[0];

  return dateString === formattedToday;
}

export function calculateWeek(start_date: string): number {
  const start = new Date(start_date);
  const current = new Date();

  const differenceInMilliseconds = current.getTime() - start.getTime();
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  const weekNumber = Math.floor(differenceInDays / 7) + 1;

  return weekNumber;
}

export function calculateProgress(
  start_date: string,
  end_date: string
): number {
  const start = new Date(start_date);
  const end = new Date(end_date);
  const current = new Date();

  // Calcul de la durée totale et de la durée écoulée
  const totalDuration = end.getTime() - start.getTime();
  const elapsedDuration = current.getTime() - start.getTime();

  // Calcul du pourcentage d'avancement
  let progress = (elapsedDuration / totalDuration) * 100;

  // Limiter le pourcentage entre 0 et 100
  if (progress < 0) {
    progress = 0;
  } else if (progress > 100) {
    progress = 100;
  }

  // Retourner le pourcentage arrondi à deux chiffres après la virgule
  return Math.round(progress);
}

export function addDays(date: string | null, daysToAdd: number): Date {
  const newDate = new Date(date!);

  newDate.setTime(newDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return newDate;
}

export function isToReview(card: Card): Card | undefined {
  if (
    card.user_meta.times_reviewed === 0 ||
    (!card.user_meta.times_reviewed &&
      !card.user_meta.last_review_date &&
      !card.user_meta.last_difficulty_level)
  ) {
    return card;
  } else {
    let intervalRevision: number;
    switch (card.user_meta.last_difficulty_level) {
      case "easy":
        intervalRevision = 5;
        break;
      case "normal":
        intervalRevision = 3;
        break;
      case "hard":
        intervalRevision = 1;
        break;
      default:
        throw new Error(
          `Niveau de difficulté inconnu: ${card.user_meta.last_difficulty_level}`
        );
    }

    const newRevisionDate = addDays(
      card.user_meta.last_review_date,
      intervalRevision
    );
    if (new Date().getTime() >= newRevisionDate.getTime()) {
      return card;
    }
  }

  return undefined;
}

export const isGoogleMeetLink = (url: string): boolean => {
  const googleMeetPattern =
    /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
  return googleMeetPattern.test(url);
};

export const validatePassword = (password: string) => {
  const minLength = 12;
  const maxLength = 64;
  return {
    minLength: password.length >= minLength,
    maxLength: password.length <= maxLength,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[!@#$%^&*(),.?':{}|<>]/.test(password),
  };
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{1,45}$/;
  return nameRegex.test(name);
};

export const isAdult = (dateOfBirth: string): boolean => {
  const birthDate = new Date(dateOfBirth);

  // Vérifier si la date est valide
  if (isNaN(birthDate.getTime())) {
    return false;
  }

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    return age > 18;
  } else {
    return age >= 18;
  }
};

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// API'S CALLS //
export const getDecks = async (): Promise<Deck[]> => {
  const callApi = getCallApi();
  const response = await callApi(`/api/decks`, { method: "get" }, null);
  return (response.data as { data: Deck[] }).data;
};

export const loadDayExpression = async () => {
  const callApi = getCallApi();
  const response: { data: { data: Expression } } = await callApi(
    `/api/day-expression`,
    { method: "get" }
  );
  return response.data.data;
};

export const updateUserMeta = async (updatedUserMeta: UserMeta) => {
  const callApi = getCallApi();
  await callApi(`/api/user-meta`, { method: "put" }, null, {
    updatedUserMeta,
  });
};

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

export const getCurrentStudents = async (
  teacherId: number,
  offset: number,
  limit: number,
  controller: AbortController
) => {
  const callApi = getCallApi();
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
    const callApi = getCallApi();
    await callApi(`/api/logout`, { method: "post" });
    store.logout();
    window.location.href = "/";
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur", error);
  }
};

export const addEvent = async (newEvent: EventPostData) => {
  const callApi = getCallApi();
  const timezone = getTimezone();
  const response = await callApi(`/api/event`, { method: "post" }, null, {
    data: { ...newEvent, timezone: timezone },
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
  const callApi = getCallApi();
  const timezone = getTimezone();
  const response: { data: { data: Event[] } } = await callApi(
    `/api/events`,
    { method: "get" },
    controller.signal,
    { ...currentUserId, timezone: timezone }
  );

  return response.data.data;
};
