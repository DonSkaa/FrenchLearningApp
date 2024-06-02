import { getCallApi } from "Functions";

export const loadDayExpression = async () => {
  const callApi = getCallApi();
  const response = await callApi(`/api/day-expression`, { method: "get" });
  return response.data.data;
};
