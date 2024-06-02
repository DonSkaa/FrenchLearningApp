import { getDecks } from "AppContainer/Context/DeckContext";
import { getCurrentUserEvents } from "AppContainer/Context/EventContext";
import { loadDayExpression } from "AppContainer/Context/ExpressionContext";
import { getCurrentStudents } from "AppContainer/Context/UserContext";
import { getCurrentUserProgram } from "AppContainer/Context/UserProgramContext";
import {
  CurrentUser,
  Deck,
  Event,
  Expression,
  User,
  UserProgram,
} from "FormattedDatabase";
import { isToReview, isToday } from "Functions";
import { makeAutoObservable } from "mobx";

class Store {
  expression?: Expression;
  decks?: Deck[];
  events?: Event[];
  currentUser?: CurrentUser;
  currentStudents?: User[];
  currentUserProgram?: UserProgram;

  constructor() {
    makeAutoObservable(this);
  }

  async setUser(user: CurrentUser) {
    this.currentUser = user;
    this.expression = await loadDayExpression();
    if (this.currentUser === undefined) {
      return;
    } else {
      if (this.currentUser.type === "teacher") {
        this.currentStudents = await getCurrentStudents(
          user.id,
          0,
          10,
          new AbortController().signal
        );
      } else {
        this.currentStudents = undefined;
      }
      const currentDecks = await getDecks();
      this.currentUserProgram = await getCurrentUserProgram();
      this.decks = currentDecks.filter((deck) =>
        this.currentUserProgram?.deck_ids.includes(deck.id)
      );
      this.events = await getCurrentUserEvents(
        user.id,
        new AbortController().signal
      );
    }
  }

  get formattedEvents(): Event[] {
    if (this.events) {
      return this.events.filter(
        (event) => isToday(event.date) && new Date(event.end) > new Date()
      );
    } else {
      return [];
    }
  }

  get formattedDecks(): Deck[] {
    if (this.decks) {
      return this.decks
        .map((deck) => ({
          ...deck,
          cards: deck.cards.filter((card) => isToReview(card)),
        }))
        .filter((deck) => deck.cards.length > 0);
    } else {
      return [];
    }
  }
}

export const store = new Store();

// @ts-ignore
// window.printStore = () => toJS(store.currentStudents);
