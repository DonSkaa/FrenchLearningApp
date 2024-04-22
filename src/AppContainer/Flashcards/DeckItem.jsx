import "./DeckItem.css"

export default function DeckItem({ currentDeck }) {
    return (
        <div className="deck-item">
            <div className="strong">{currentDeck.name}</div>
            <div className="strong">{currentDeck.cards.length}</div>
        </div>
    )
}