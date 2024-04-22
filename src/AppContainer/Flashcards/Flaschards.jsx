import DeckItem from "./DeckItem"
import { deck, card } from "Database"

export default function FlashCards() {

    const formatedDecks = deck.map((deck) => {
        const deckCards = card.filter((card) => card.deck_id === deck.id)
        return {
            ...deck,
            cards: deckCards,
        }
    })

    return (
        <div className="full-width flex center">
            <div className="half-width">
                <div className="m-b-40">
                    <div className="flex">
                        <h4>Liste des paquets</h4>
                        <h4>reste à réviser</h4>
                    </div>
                    <div className="flex column gap-1">
                        {formatedDecks.map(deck => {
                            return (
                                <div key={deck.id}>
                                    <DeckItem currentDeck={deck} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}