import { useContext } from "react"
import DeckItem from "../Components/DeckItem/DeckItem"
import { DeckContext } from "AppContainer/Context/DeckContext"

export default function Flashcards() {

    const { decks } = useContext(DeckContext)

    return (
        <div className="full-width flex center">
            <div className="half-width m-t-40">
                <div className="m-b-40">
                    <div className="flex">
                        <h3>Liste des paquets</h3>
                        <h5>reste à réviser</h5>
                    </div>
                    <div className="flex column gap-1">
                        {decks.map(deck => {
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