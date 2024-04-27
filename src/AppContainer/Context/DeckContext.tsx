import { createContext, useEffect, useState } from "react"
import { deck, Deck } from "FormatedDatabase"
import { isToReview } from "Functions"

interface DeckContextType {
    decks: Deck[];
    getDeck: (id: number) => Deck | undefined;
    updateDeck: (updatedDeck: Deck) => void;
}

export const DeckContext = createContext<DeckContextType>({
    decks: [],
    getDeck: () => undefined,
    updateDeck: () => { },
})

function DeckContextProvider(props: React.PropsWithChildren<{}>) {

    const [decks, setDecks] = useState<Deck[]>(deck)

    useEffect(() => {
        setDecks(pvsDeck => {
            const newDeck = pvsDeck.map(deck => {
                const cardsToReview = deck.cards.filter(card => isToReview(card))
                return {
                    ...deck,
                    cards: cardsToReview,
                }
            })
            return newDeck
        })
    }, [])

    const getDeck = (id: number) => {
        return decks.find(deck => deck.id === id)
    }

    const updateDeck = (updatedDeck: Deck) => {
        setDecks((prvDecks) => {
            return prvDecks.map((deck) =>
                deck.id === updatedDeck.id
                    ? { ...updatedDeck, cards: updatedDeck.cards.filter(card => isToReview(card)) }
                    : deck
            )
        })
    }

    return (
        <DeckContext.Provider value={{ decks, getDeck, updateDeck }}>
            {props.children}
        </DeckContext.Provider>
    )
}

export default DeckContextProvider


