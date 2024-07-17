import { DeckItem } from "AppContainer/Components/DeckItem/DeckItem";
import { Expression } from "AppContainer/Expression/Expression";
import { Deck, Event } from "Interfaces";
import { observer } from "mobx-react-lite";
import { store } from "store";
import { EventItem } from "../Components/EventItem/EventItem";
import "./Dashboard.css";

export const Dashboard = observer(function Dashboard() {
  const formattedEvents = store.formattedEvents;
  const formattedDecks = store.formattedDecks;

  return (
    <div className="container">
      <div className="main-section">
        <div className="flex start align-center gap-1">
          <h2 className="m-0">
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
        <div className="side-section">
          <Expression />
        </div>
      ) : null}
    </div>
  );
});
