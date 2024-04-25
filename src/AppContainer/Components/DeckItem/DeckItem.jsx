import { isToReview } from "Functions";
import "./DeckItem.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function DeckItem({ currentDeck }) {

    const [formatedCurrentDeck, setFormatedCurrentDeck] = useState(currentDeck)

    useEffect(() => {
        setFormatedCurrentDeck(pvsDeck => {

            const cardsToReview = currentDeck.cards.filter(card => isToReview(card))
            return { ...pvsDeck, cards: cardsToReview }

        })
    }, [currentDeck])

    return (
        <>
            {
                formatedCurrentDeck.cards.length
                    ? <Link className="deck-item review" to="/study" state={formatedCurrentDeck}>
                        <div className="strong">{formatedCurrentDeck.name}</div>
                        <div className="strong">{formatedCurrentDeck.cards.length}</div>
                    </Link>
                    : <div className='deck-item revised'>
                        <div className="strong">{formatedCurrentDeck.name}</div>
                        <div className="strong">✅</div>
                    </div>
            }
        </>
    )
}