import { Deck } from "FormattedDatabase";
import { getCallApi } from "Functions";
import { store } from "store";

export const getCurrentDecks = async (deckIds: number[]): Promise<Deck[]> => {
  const callApi = getCallApi();
  const response = await callApi(`api/decks`, { method: "get" }, null, {
    deck_ids: store.currentUserProgram?.deck_ids || [],
  });
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
