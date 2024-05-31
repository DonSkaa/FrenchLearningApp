import { Deck } from "FormattedDatabase";
import { isToReview } from "Functions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DeckItem.css";

interface DeckItemProps {
  currentDeck: Deck;
}

export default function DeckItem({ currentDeck }: DeckItemProps): JSX.Element {
  const [formattedCurrentDeck, setFormattedCurrentDeck] = useState<
    Deck | undefined
  >(undefined);

  useEffect(() => {
    const formattedCards = currentDeck.cards.filter((card) => isToReview(card));
    setFormattedCurrentDeck({ ...currentDeck, cards: formattedCards });
  }, [currentDeck]);

  return (
    <>
      {formattedCurrentDeck && formattedCurrentDeck.cards.length > 0 ? (
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
}
