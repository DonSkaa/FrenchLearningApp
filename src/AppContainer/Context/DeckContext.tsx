import { Deck } from "FormattedDatabase";
import { useCallApi } from "Functions";
import { store } from "store";

const getCurrentDecks = async (deckIds: number[]): Promise<Deck[]> => {
  const callApi = useCallApi();
  const response = await callApi(`api/decks`, { method: "get" }, null, {
    deck_ids: deckIds,
  });
  return response.data.data;
};

export const fetchUserProgram = async () => {
  if (store.currentUserProgram?.deck_ids) {
    const currentDecks = await getCurrentDecks(
      store.currentUserProgram?.deck_ids
    );
    setDecks(currentDecks);
  } else {
    setDecks([]);
  }
};
