import {
  CurrentUser,
  Deck,
  Event,
  Expression,
  UserProgram,
} from "FormattedDatabase";
import { makeAutoObservable } from "mobx";

class Store {
  expression?: Expression;
  decks?: Deck[];
  events?: Event[];
  currentUser?: CurrentUser;
  currentStudents?: CurrentUser[];
  currentUserProgram?: UserProgram[];

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
