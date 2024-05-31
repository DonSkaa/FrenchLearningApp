import DeckItem from "AppContainer/Components/DeckItem/DeckItem";
import { DeckContext } from "AppContainer/Context/DeckContext";
import { EventContext } from "AppContainer/Context/EventContext";
import Expression from "AppContainer/Expression/Expression";
import { Deck, Event } from "FormattedDatabase";
import { isToReview, isToday } from "Functions";
import { useContext, useEffect, useState } from "react";
import { store } from "store";
import EventItem from "../Components/EventItem/EventItem";
import "./Dashboard.css";

export default function Dashboard() {
  const { events } = useContext(EventContext);
  const { decks } = useContext(DeckContext);
  const [formattedEvents, setFormattedEvents] = useState<any>([]);
  const [formattedDecks, setFormattedDecks] = useState<any>([]);

  useEffect(() => {
    if (events) {
      const filteredEvents = events.filter(
        (event) => isToday(event.date) && new Date(event.end) > new Date()
      );
      setFormattedEvents(filteredEvents);
    }
  }, [events]);

  useEffect(() => {
    const filteredDecks = decks.map((deck) => ({
      ...deck,
      cards: deck.cards.filter((card) => isToReview(card)),
    }));
    const formattedDecksCards = filteredDecks.filter(
      (deck) => deck.cards.length > 0
    );
    setFormattedDecks(formattedDecksCards);
  }, [decks]);

  return (
    <div className="full-width flex center gap-2 m-4">
      <div className="main-section m-t-40">
        <div className="flex start align-center gap-1">
          <h2>
            {store?.currentUser?.type === "student"
              ? "Tâches du jour"
              : "Leçons du jour"}
          </h2>
          <div>•</div>
          <h2>{formattedEvents.length + formattedDecks.length}</h2>
        </div>
        <div className="flex column gap-1">
          {formattedEvents || formattedDecks ? (
            <>
              {store?.currentUser?.type === "student" &&
              formattedEvents.length ? (
                <h4 className="left m-0">Évènements</h4>
              ) : null}
              {formattedEvents.map((event: Event) => {
                return (
                  <div key={event.id}>
                    <EventItem event={event} />
                  </div>
                );
              })}
              {formattedDecks.length ? (
                <h4 className="left m-0">Révisions</h4>
              ) : null}
              {formattedDecks.map((deck: Deck) => {
                return (
                  <div key={deck.id}>
                    <DeckItem currentDeck={deck} />
                  </div>
                );
              })}
            </>
          ) : (
            <div>Pas de tâches pour aujourd'hui</div>
          )}
        </div>
      </div>
      {store?.currentUser?.type === "student" ? (
        <div className="side-section m-t-40">
          <Expression />
        </div>
      ) : null}
    </div>
  );
}
