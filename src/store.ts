import {
  CurrentUser,
  Deck,
  Event,
  Expression,
  UserProgram,
} from "FormattedDatabase";
// Rest of the code remains the same
import {
  getCurrentStudents,
  getCurrentUserEvents,
  getCurrentUserProgram,
  getDecks,
  isToReview,
  isToday,
  loadDayExpression,
} from "Functions";
import { makeAutoObservable } from "mobx";

class Store {
  expression?: Expression;
  decks: Deck[] = [];
  events: Event[] = [];
  currentUser?: CurrentUser;
  currentStudents: CurrentUser[] = [];
  currentUserProgram?: UserProgram;
  offset = 0;
  limit?: number;
  totalItems = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get hasMoreStudents(): boolean {
    return this.currentStudents.length < this.totalItems;
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
        )) as { data: CurrentUser[]; totalItems: number };
        this.currentStudents = response.data;
        this.totalItems = response.totalItems;
      } else {
        this.currentStudents = [];
        this.totalItems = 0;
        this.currentUserProgram = await getCurrentUserProgram();
        this.decks = await getDecks();
      }
      this.events = await getCurrentUserEvents(user.id, new AbortController());
    }
  }

  logout() {
    this.currentUser = undefined;
    this.expression = undefined;
    this.decks = [];
    this.events = [];
    this.currentStudents = [];
    this.currentUserProgram = undefined;
    this.offset = 0;
    this.limit = undefined;
    this.totalItems = 0;
  }

  get userDecks(): Deck[] {
    return this.decks
      .filter((deck) => this.currentUserProgram?.deck_ids.includes(deck.id))
      .map(filterDeck);
  }

  getDeck(deckId: number): Deck | undefined {
    const x = this.decks.find((deck) => deck.id === deckId);
    if (x) {
      return filterDeck(x);
    } else {
      return undefined;
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
      return this.decks.map(filterDeck).filter((deck) => deck.cards.length > 0);
    } else {
      return [];
    }
  }
}

export const filterDeck = (deck: Deck) => {
  return {
    ...deck,
    cards: deck.cards.filter((card) => isToReview(card)),
  };
};

export const store = new Store();
