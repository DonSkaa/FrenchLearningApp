import { cardLevels } from "AppConstantes";
import { updateUserMeta } from "AppContainer/Context/UserMetaContext";
import { Card, Deck, UserMeta } from "FormattedDatabase";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "store";

export const Studying = observer(function Studying(): JSX.Element {
  const params = useParams();
  const deckId = Number(params.id);
  const navigate = useNavigate();

  const [currentDeck, setCurrentDeck] = useState<Deck | undefined>(undefined);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (deckId) {
      const studyingDeck = store.decks?.find((deck) => deck.id === deckId);
      setCurrentDeck(studyingDeck);
    }
  }, [deckId]);

  const updateCardLevel = (level: string, cardId: Card["id"]): void => {
    const currentCard = currentDeck?.cards.find((card) => card.id === cardId);

    if (currentCard?.user_meta) {
      const updatedUserMeta = {
        ...currentCard.user_meta,
        times_reviewed: currentCard.user_meta.times_reviewed + 1,
        last_review_date: new Date().toISOString(),
        last_difficulty_level: level,
      };
      updateUserMeta(updatedUserMeta)
        .then((updatedUserMeta: UserMeta) => {
          setCurrentDeck((prvDeck) => {
            if (!prvDeck?.cards) return prvDeck;

            const newCards = prvDeck.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  user_meta: updatedUserMeta,
                };
              }

              return card;
            });

            setCardIndex((prevIdx) => prevIdx + 1);
            setShowAnswer(false);

            return { ...prvDeck, cards: newCards };
          });
        })
        .catch((error: Error) => console.log(error));
    }
  };

  useEffect(() => {
    if (currentDeck) {
      store.decks = store.decks?.map((deck) => {
        if (deck.id === currentDeck.id) {
          return currentDeck;
        } else {
          return deck;
        }
      });
      if (cardIndex === currentDeck.cards.length) {
        navigate("/flashcards");
      }
    }
  }, [currentDeck]);

  return (
    <div className="full-width flex center m-4">
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
                  {currentDeck.cards[cardIndex].recto}
                </h3>
                {showAnswer ? (
                  <div>
                    <hr />
                    <h3 className="text-center">
                      {currentDeck.cards[cardIndex].verso}
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
