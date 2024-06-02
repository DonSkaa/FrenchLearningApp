import { getCallApi } from "Functions";
import { store } from "store";

export const loadDayExpression = async () => {
  const callApi = getCallApi();
  const response = await callApi(`/api/day-expression`, { method: "get" });
  store.expression = response.data.data;
};
