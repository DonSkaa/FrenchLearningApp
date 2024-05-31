import { createContext } from "react";
import { Expression } from "FormatedDatabase";
import { useCallApi } from "Functions";
import { store } from "store";

export const getDayExpression = async () => {
  const callApi = useCallApi();
  const response = await callApi(`/api/day-expression`, { method: "get" });
  store.expression = response.data.data;
};
