import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cardLevels } from "AppConstantes";
import { Card } from "Database"

/** TODO Import from elsewhere instead of re-declaring */
export interface Deck {
    name: string;
    cards: Card[];
}

export default function Studying(): JSX.Element {
    const location = useLocation()
    const [currentDeck, setCurrentDeck] = useState<Partial<Deck>>({})
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    useEffect(() => {
        if (location?.state) {
            setCurrentDeck(location.state as Deck)
        }
    }, [location])

    const updateCardLevel = (level: string, cardId: Card['id']): void => {
        setCurrentDeck((prevDeck) => {
            if (!prevDeck?.cards) return prevDeck

            const newCards = prevDeck.cards.map((card) => {
                if (card.id === cardId) {
                    return { ...card, last_difficulty_level: level }
                }
                return card
            })

            return { ...prevDeck, cards: newCards }
        });

        setCardIndex((prevIdx) => prevIdx + 1)
        setShowAnswer(false)
    };

    // Rendu du composant
    return (
        <div className="full-width flex center">
            <div className="half-width m-t-40">
                <div className="flex-center gap-1 m-b-40">
                    <div className="time-cursor-container">
                        <div
                            className="time-cursor"
                            style={{
                                width: `${((cardIndex + 1) / (currentDeck.cards?.length || 1)) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>

                {
                    currentDeck.cards
                        ? <div className="flex column three-quarter-height">
                            <div>
                                <h3 className="text-center">{currentDeck.cards[cardIndex].recto}</h3>
                                {
                                    showAnswer
                                        ? <div>
                                            <hr />
                                            <h3 className="text-center">{currentDeck.cards[cardIndex].verso}</h3>
                                        </div>
                                        : null
                                }
                            </div>
                            {
                                showAnswer
                                    ? <div className="flex gap-1">
                                        {cardLevels.map((level, index) => (
                                            <button
                                                key={index}
                                                className="strong-button"
                                                onClick={() => updateCardLevel(level.slug, currentDeck.cards[cardIndex].id)}
                                            >
                                                {level.name}
                                            </button>
                                        ))}
                                    </div>
                                    : <button className="strong-button" onClick={() => setShowAnswer(true)}>
                                        AFFICHER LA RÉPONSE
                                    </button>
                            }
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
