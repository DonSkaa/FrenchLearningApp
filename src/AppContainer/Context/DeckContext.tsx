import { Deck } from "FormattedDatabase";
import { getCallApi } from "Functions";

export const getDecks = async (): Promise<Deck[]> => {
  const callApi = getCallApi();
  const response = await callApi(`api/decks`, { method: "get" }, null);
  return response.data.data;
};

// export const fetchUserProgram = async () => {
//   if (store.currentUserProgram?.deck_ids) {
//     const currentDecks = await getCurrentDecks();
//     store.decks = currentDecks;
//   } else {
//     store.decks = [];
//   }
// };
