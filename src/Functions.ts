import { Card } from "FormattedDatabase";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

interface CallApiOptions extends AxiosRequestConfig {
  method?: "get" | "post" | "put" | "delete";
}

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

    if (newRevisionDate.getTime() === new Date().getTime()) {
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
  return {
    minLength: password.length >= minLength,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
