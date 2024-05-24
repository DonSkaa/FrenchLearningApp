import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { cardLevels } from "AppConstantes"
import { Card, Deck } from "FormatedDatabase"
import { DeckContext } from "AppContainer/Context/DeckContext"
import { UserMetaContext } from "AppContainer/Context/UserMetaContext"

export default function Studying(): JSX.Element {

    const params = useParams()
    let deckId = Number(params.id)
    const { decks, setDecks } = useContext(DeckContext)
    const { updateUserMeta } = useContext(UserMetaContext)
    const navigate = useNavigate()

    const [currentDeck, setCurrentDeck] = useState<Deck | undefined>(undefined)
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    useEffect(() => {
        if (deckId) {
            const studyingDeck = decks.find(deck => deck.id === deckId)
            setCurrentDeck(studyingDeck)
        }
    }, [deckId])

    const updateCardLevel = (level: string, cardId: Card['id']): void => {

        const currentCard = currentDeck?.cards.find(card => card.id === cardId)

        if (currentCard && currentCard.user_meta) {
            const updatedUserMeta = {
                ...currentCard.user_meta,
                times_reviewed: currentCard.user_meta.times_reviewed + 1,
                last_review_date: new Date().toISOString(),
                last_difficulty_level: level,
            }
            updateUserMeta(updatedUserMeta)
                .then(updatedUserMeta => {
                    setCurrentDeck(prvDeck => {
                        if (!prvDeck?.cards) return prvDeck

                        const newCards = prvDeck.cards.map((card) => {
                            if (card.id === cardId) {
                                return {
                                    ...card,
                                    user_meta: updatedUserMeta,
                                }
                            }
                            return card
                        })

                        setCardIndex((prevIdx) => prevIdx + 1)
                        setShowAnswer(false)

                        return { ...prvDeck, cards: newCards }
                    })
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        if (currentDeck) {

            setDecks(pvsDeck => pvsDeck.map(deck => {
                if (deck.id === currentDeck.id) {
                    console.log('updating deck', deck.id, currentDeck.id);
                    console.log('current deck', currentDeck);

                    return currentDeck
                } else {
                    return deck
                }
            }))

            if (cardIndex === currentDeck.cards.length) {
                navigate('/flashcards')
            }
        }
    }, [currentDeck])

    // useEffect(() => {
    //     console.log(decks);
    // }, [decks])

    return (
        <div className="full-width flex center">
            {
                currentDeck && currentDeck.cards && cardIndex < currentDeck.cards.length
                    ? <div className="half-width m-t-40">
                        <div className="flex-center gap-1 m-b-40">
                            <div style={{ maxHeight: "32px" }}>
                                <button className='default-button'>
                                    <img src="/assets/close.png" alt="" />
                                </button>
                            </div>
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
