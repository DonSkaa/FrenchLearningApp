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
  UserProgram,
} from "FormattedDatabase";
import { isToReview, isToday } from "Functions";
import { makeAutoObservable } from "mobx";

class Store {
  expression?: Expression;
  decks?: Deck[];
  events?: Event[];
  currentUser?: CurrentUser;
  currentStudents?: CurrentUser[];
  currentUserProgram?: UserProgram;
  offset?: number;
  limit?: number;
  totalItems?: number;
  hasMoreStudents?: boolean;

  constructor() {
    makeAutoObservable(this);
  }

  async setUser(user: CurrentUser) {
    this.offset = 0;
    this.limit = 10;
    this.currentUser = user;
    this.expression = await loadDayExpression();
    if (this.currentUser === undefined) {
      return;
    } else {
      if (this.currentUser.type === "teacher") {
        const response = (await getCurrentStudents(
          user.id,
          this.offset,
          this.limit,
          new AbortController()
        )) as unknown;
        this.currentStudents = response.data as CurrentUser[];
        this.totalItems = (response as { totalItems: number }).totalItems;
        this.hasMoreStudents = this.currentStudents
          ? this.currentStudents.length < this.totalItems
          : false;
      } else {
        this.currentStudents = undefined;
        this.totalItems = 0;
      }
      const currentDecks = await getDecks();
      this.currentUserProgram = await getCurrentUserProgram();
      this.decks = currentDecks.filter((deck) =>
        this.currentUserProgram?.deck_ids.includes(deck.id)
      );
      this.events = await getCurrentUserEvents(user.id, new AbortController());
    }
  }

  get formattedEvents(): Event[] {
    if (this.events?.length) {
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
