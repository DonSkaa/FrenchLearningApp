import { makeAutoObservable } from "mobx";
import {
  Event,
  CurrentUser,
  Deck,
  Expression,
  UserProgram,
} from "FormatedDatabase";

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
