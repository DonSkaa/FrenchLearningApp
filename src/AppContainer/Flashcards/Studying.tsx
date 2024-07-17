import { cardLevels } from "AppConstantes";
import { updateUserMeta } from "Functions";
import { Card, UserMeta } from "Interfaces";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "store";

export const Studying = observer(function Studying(): JSX.Element {
  const params = useParams();
  const deckId = Number(params.id);
  const navigate = useNavigate();

  const currentDeck = store.getDeck(deckId);
  const cardIndex = 0;
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (!currentDeck?.cards.length) {
      navigate("/flashcards");
    }
  }, [currentDeck?.cards]);

  const updateCardLevel = (level: string, cardId: Card["id"]): void => {
    const currentCard = currentDeck?.cards.find((card) => card.id === cardId);

    if (currentCard?.user_meta) {
      const updatedUserMeta: UserMeta = {
        ...currentCard.user_meta,
        times_reviewed: currentCard.user_meta.times_reviewed + 1,
        last_review_date: new Date().toISOString(),
        last_difficulty_level: level,
      };
      void updateUserMeta(updatedUserMeta).then(() => {
        store.decks.forEach((deck) => {
          deck.cards.forEach((card) => {
            if (card.id === updatedUserMeta.card_id) {
              card.user_meta = updatedUserMeta;
            }
          });
        });
        // setCardIndex((prevIdx) => prevIdx + 1);
        setShowAnswer(false);
      });
    }
  };

  return (
    <div className="container">
      <div className="main-section">
        {currentDeck?.cards && cardIndex < currentDeck.cards.length ? (
          <>
            <div className="flex-center gap-1 m-b-40">
              <div style={{ maxHeight: "32px" }}>
                <button
                  className="default-button"
                  onClick={() => navigate("/flashcards")}
                >
                  <img src="/assets/close.png" alt="" />
                </button>
              </div>
              <div className="time-cursor-container">
                <div
                  className="time-cursor"
                  style={{
                    width: `${
                      ((cardIndex + 1) / currentDeck.cards.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex column three-quarter-height">
              <div>
                <h3 className="text-center">
                  {currentDeck.cards[cardIndex].front_side}
                </h3>
                {showAnswer ? (
                  <div>
                    <hr />
                    <h3 className="text-center">
                      {currentDeck.cards[cardIndex].back_side}
                    </h3>
                  </div>
                ) : null}
              </div>
              {showAnswer ? (
                <div className="flex gap-1">
                  {cardLevels.map((level, index) => (
                    <button
                      key={index}
                      className="strong-button"
                      onClick={() =>
                        updateCardLevel(
                          level.slug,
                          currentDeck.cards[cardIndex].id
                        )
                      }
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  className="strong-button"
                  onClick={() => setShowAnswer(true)}
                >
                  AFFICHER LA RÉPONSE
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
});
