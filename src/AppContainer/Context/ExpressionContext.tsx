import { Expression } from "FormattedDatabase";
import { getCallApi } from "Functions";

export const loadDayExpression = async () => {
  const callApi = getCallApi();
  const response: { data: { data: Expression } } = await callApi(
    `/api/day-expression`,
    { method: "get" }
  );
  return response.data.data;
};
