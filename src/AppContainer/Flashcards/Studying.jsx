import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { cardLevels } from "AppConstantes"

export default function Studying() {

    const data = useLocation()
    const [currentDeck, setCurrentDeck] = useState({})
    const [cardIndex, setCardIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(() => {
        if (data?.state) {
            setCurrentDeck(data.state)
        }
    }, [data])

    const updateCardLevel = (level, cardId) => {
        setCurrentDeck(pvsDeck => {
            const newCards = pvsDeck.cards.map(card => {
                if (card.id === cardId) {
                    return { ...card, last_difficulty_level: level }
                } else {
                    return card
                }
            })
            return { ...pvsDeck, cards: newCards }
        })
        setCardIndex(pvsIdx => pvsIdx + 1)
        setShowAnswer(false)
    }

    return (
        <div className="full-width flex center">
            <div className="half-width m-t-40">
                <div className="flex-center gap-1 m-b-40">
                    <div className="time-cursor-container">
                        <div className="time-cursor"
                            style={{ width: `${((cardIndex + 1) / currentDeck?.cards?.length) * 100}%` }}
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
                                        {cardLevels.map((level, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    className="strong-button"
                                                    onClick={() => updateCardLevel(level.slug, currentDeck.cards[cardIndex].id)}
                                                >
                                                    {level.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    : <button
                                        className="strong-button"
                                        onClick={() => setShowAnswer(true)}
                                    >
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