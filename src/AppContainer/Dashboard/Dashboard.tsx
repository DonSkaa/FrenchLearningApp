import { useContext, useEffect, useState } from "react"
import "./Dashboard.css"
import { isToReview, isToday } from "Functions"
import EventItem from "../Components/EventItem/EventItem"
import Expression from "AppContainer/Expression/Expression"
import { EventContext } from "AppContainer/Context/EventContext"
import { DeckContext } from "AppContainer/Context/DeckContext"
import DeckItem from "AppContainer/Components/DeckItem/DeckItem"
import { Deck, Event } from "FormatedDatabase"

export default function Dashboard() {

    const { events } = useContext(EventContext)
    const { decks } = useContext(DeckContext)
    const [formatedEvents, setFormatedEvents] = useState<any>([])
    const [formatedDecks, setFormatedDecks] = useState<any>([])

    useEffect(() => {
        if (events) {
            const filteredEvents = events.filter(event => isToday(event.date) && new Date(event.end) > new Date())
            setFormatedEvents(filteredEvents)
        }
    }, [events])

    useEffect(() => {
        const filteredDecks = decks.map(deck => ({ ...deck, cards: deck.cards.filter(card => isToReview(card)) }))
        const formatedDecksCards = filteredDecks.filter(deck => deck.cards.length > 0)
        setFormatedDecks(formatedDecksCards)
    }, [decks])

    return (
        <div className="full-width flex center gap-2 m-4">
            <div className="main-section m-t-40">
                <h2 className="left m-t-25">Tâches du jour</h2>
                <div className="flex column gap-1">
                    {formatedEvents || formatedDecks
                        ? <>
                            {formatedEvents
                                ? <h4 className="left m-0">Évènements</h4>
                                : null}
                            {
                                formatedEvents
                                    .map((event: Event) => {
                                        return (
                                            <div key={event.id}>
                                                <EventItem event={event} />
                                            </div>
                                        )
                                    })
                            }
                            {formatedDecks
                                ? <h4 className="left m-0">Révisions</h4>
                                : null}
                            {
                                formatedDecks
                                    .map((deck: Deck) => {
                                        return (
                                            <div key={deck.id}>
                                                <DeckItem currentDeck={deck} />
                                            </div>
                                        )
                                    })

                            }
                        </>
                        : <div>Pas de tâches pour aujourd'hui</div>}
                </div>
            </div>
            <div className="side-section m-t-40">
                <Expression />
            </div>
        </div>
    )
}