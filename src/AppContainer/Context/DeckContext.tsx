import { Deck } from "FormattedDatabase";
import { getCallApi } from "Functions";

export const getDecks = async (): Promise<Deck[]> => {
  const callApi = getCallApi();
  const response = await callApi(`/api/decks`, { method: "get" }, null);
  return (response.data as { data: Deck[] }).data;
};
