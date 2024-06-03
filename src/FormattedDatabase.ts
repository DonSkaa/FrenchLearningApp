export interface CurrentUser {
  id: number;
  type: string;
  name: string;
  email: string;
  user_programs_id: number;
  user_metas: [];
  teacher_id: number | null;
}

export interface Event {
  id: number;
  user_id: number;
  event_type: string;
  title: string;
  date: string;
  start: string;
  end: string;
  meeting_link: string;
  teacher_id: number;
  user: CurrentUser;
}

export interface EventPostData {
  user_id: number;
  event_type: string;
  date: string;
  start: string;
  end: string;
  teacher_id: number;
  meeting_link: string;
}

export interface CalendarEvent {
  id: string;
  user_id: number;
  event_type: string;
  title: string;
  date: string;
  start: string;
  end: string;
  meeting_link: string;
}

export interface UserMeta {
  id: number;
  last_review_date: string;
  last_difficulty_level: string;
  times_reviewed: number;
  card_id: number;
  user_id: number;
}

export interface UserProgram {
  id: number;
  user_id: number;
  program_id: number;
  start_date: string;
  end_date: string;
  deck_ids: number[];
}

export interface Program {
  id: number;
  days_duration: number;
  thematics: Thematic[];
}

export interface Thematic {
  id: number;
  name: string;
  week_number: number;
  deck_id: number;
}

export interface Card {
  id: number;
  deck_id: number;
  recto: string;
  verso: string;
  user_meta: {
    id: number;
    card_id: number;
    user_id: number;
    times_reviewed: number;
    last_review_date: string | null;
    last_difficulty_level: string | null;
  };
}

export interface Deck {
  id: number;
  thematic: string;
  cards: Card[];
  updated: true | false;
}

export interface Expression {
  id: number;
  title: string;
  description: string;
  last_used_date: string | null;
}
