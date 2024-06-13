import { Deck } from "FormattedDatabase";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "./DeckItem.css";

interface DeckItemProps {
  currentDeck: Deck;
}

export const DeckItem = observer(function DeckItem({
  currentDeck,
}: DeckItemProps): JSX.Element {
  return (
    <>
      {currentDeck?.cards.length > 0 ? (
        <Link className="deck-item review" to={`/study/${currentDeck.id}`}>
          <div className="strong">{currentDeck.thematic}</div>
          <div className="strong">{currentDeck.cards.length}</div>
        </Link>
      ) : (
        <div className="deck-item revised">
          <div className="strong">{currentDeck.thematic}</div>
          <div className="completed-icon-container display-flex justify-center align-center">
            <img className="completed-icon" src="/assets/completed.png"></img>
          </div>
        </div>
      )}
    </>
  );
});
