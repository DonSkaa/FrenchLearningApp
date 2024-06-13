import { observer } from "mobx-react-lite";
import { store } from "store";
import { DeckItem } from "../Components/DeckItem/DeckItem";

export const Flashcards = observer(function Flashcards() {
  return (
    <div className="full-width flex center m-4">
      <div className="main-section">
        <div className="m-b-40">
          <div className="flex">
            <h3>Liste des paquets</h3>
            <h5>reste à réviser</h5>
          </div>
          <div className="flex column gap-1">
            {store.userDecks.map((deck) => {
              return (
                <div key={deck.id}>
                  <DeckItem currentDeck={deck} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
