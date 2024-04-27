import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardLevels } from "AppConstantes";
import { Card, Deck } from "FormatedDatabase"
import { DeckContext } from "AppContainer/Context/DeckContext";

export default function Studying(): JSX.Element {

    const params = useParams()
    let deckId = Number(params.id)
    const navigate = useNavigate()

    const { getDeck, updateDeck } = useContext(DeckContext)
    const [currentDeck, setCurrentDeck] = useState<Deck | undefined>(undefined)
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    useEffect(() => {
        if (deckId) {
            setCurrentDeck(getDeck(deckId) as Deck)
        }
    }, [deckId])

    const updateCardLevel = (level: string, cardId: Card['id']): void => {
        setCurrentDeck(prvDeck => {
            if (!prvDeck?.cards) return prvDeck

            const newCards = prvDeck.cards.map((card) => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        times_reviewed: card.times_reviewed + 1,
                        last_review_date: new Date().toISOString(),
                        last_difficulty_level: level,
                    }
                }
                return card
            })

            setCardIndex((prevIdx) => prevIdx + 1)
            setShowAnswer(false)

            return { ...prvDeck, cards: newCards }
        })
    }

    useEffect(() => {
        if (currentDeck && cardIndex === currentDeck.cards.length) {
            updateDeck(currentDeck)
            navigate('/flashcards');
        }
    }, [currentDeck])

    // Rendu du composant
    return (
        <div className="full-width flex center">
            {
                currentDeck && currentDeck.cards && cardIndex < currentDeck.cards.length 
                    ? <div className="half-width m-t-40">
                        <div className="flex-center gap-1 m-b-40">
                            <div className="time-cursor-container">
                                <div
                                    className="time-cursor"
                                    style={{
                                        width: `${((cardIndex + 1) / (currentDeck.cards.length)) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex column three-quarter-height">
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
                    </div>
                    : null
            }
        </div >
    )
}
