import { isToReview } from "Functions";
import "./DeckItem.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function DeckItem({ currentDeck }) {

    const navigate = useNavigate()
    const [cardsToReview, setCardsToReview] = useState([])

    const study = () => {
        navigate(`/study`)
    }

    useEffect(() => {
        setCardsToReview(currentDeck.cards.filter(card => {
            return isToReview(card)
        }))
    }, [currentDeck])

    useEffect(() => {
        console.log(cardsToReview);
    }, [cardsToReview])

    return (
        <>
            {
                cardsToReview.length
                    ? <div className="deck-item review" onClick={() => study(currentDeck.id)}>
                        <div className="strong">{currentDeck.name}</div>
                        <div className="strong">{cardsToReview.length}</div>
                    </div>
                    : <div className='deck-item revised'>
                        <div className="strong">{currentDeck.name}</div>
                        <div className="strong">✅</div>
                    </div>
            }
        </>
    )
}