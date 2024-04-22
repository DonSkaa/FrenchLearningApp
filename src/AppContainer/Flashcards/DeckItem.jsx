import "./DeckItem.css"
import { useNavigate } from 'react-router-dom';

export default function DeckItem({ currentDeck }) {

    const navigate = useNavigate()
    const cardsToReview = currentDeck.cards.filter(card => card.status === 'review')

    const study = () => {
        navigate(`/study`)
    }

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