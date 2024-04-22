import DeckItem from "./DeckItem"

export default function FlashCards() {

    const decks = [
        {
            name: 'Nourriture',
            cards: [
                { recto: 'a fork', verso: 'une fourchette' },
                { recto: 'a plate', verso: 'une assiette' },
                { recto: 'the dining room', verso: 'la salle à manger' },
                { recto: 'prepare the meal', verso: 'préparer le repas' }
            ]
        },
        {
            name: 'Travail',
            cards: [
                { recto: 'apply', verso: 'candidater' },
                { recto: 'take time off', verso: 'prendre des congés' },
                { recto: 'payslip', verso: 'fiche de paie' },
            ]
        },
        {
            name: 'Transport',
            cards: [
                { recto: 'take the train', verso: 'prendre le train' },
                { recto: 'buy a bus ticket', verso: 'acheter un ticket de bus' }
            ]
        },
    ]
    return (
        <div className="full-width flex center">
            <div className="half-width">
                <div className="m-b-40">
                    <div className="flex">
                        <h4>Liste des paquets</h4>
                        <h4>reste à réviser</h4>
                    </div>
                    <div className="flex column gap-1">
                        {decks.map(deck => {
                            return (
                                <DeckItem currentDeck={deck} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}