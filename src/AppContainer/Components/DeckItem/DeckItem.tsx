import "./DeckItem.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isToReview } from "Functions";
import { Card } from "../../../Database";

interface Deck {
    id: number,
    name: string;
    cards: Card[];
}

interface DeckItemProps {
    currentDeck: Deck;
}

// Définition du composant DeckItem
export default function DeckItem({ currentDeck }: DeckItemProps): JSX.Element {
    // Typage du state avec Deck
    const [formatedCurrentDeck, setFormatedCurrentDeck] = useState<Deck>(currentDeck)

    // Effet qui filtre les cartes à réviser
    useEffect(() => {
        setFormatedCurrentDeck((prevDeck) => {
            const cardsToReview = currentDeck.cards.filter(card => isToReview(card))
            return { ...prevDeck, cards: cardsToReview }
        });
    }, [currentDeck]);
    return (
        <>
            {formatedCurrentDeck.cards.length > 0 ? (
                <Link className="deck-item review" to="/study" state={formatedCurrentDeck}>
                    <div className="strong">{formatedCurrentDeck.name}</div>
                    <div className="strong">{formatedCurrentDeck.cards.length}</div>
                </Link>
            ) : (
                <div className="deck-item revised">
                    <div className="strong">{formatedCurrentDeck.name}</div>
                    <div className="strong">✅</div>
                </div>
            )}
        </>
    )
}
