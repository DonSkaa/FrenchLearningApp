export interface User {
    id: number;
    name: string;
    last_name: string;
    profile_image_path: string;
    mail: string;
    password: string;
    user_program_id: number;
}

export interface CurrentUser {
    id: number;
    type: string;
    name: string;
    email: string;
    user_metas: [];
    teacher_id: string;
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

export const event: Event[] = [
    {
        id: 1,
        user_id: 1,
        event_type: 'lesson',
        title: 'Conversation',
        date: "2024-04-24",
        start: "2024-04-24T14:30:00Z",
        end: "2024-04-24T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 2,
        user_id: 1,
        event_type: 'lesson',
        title: 'Mise en situation',
        date: "2024-05-01",
        start: "2024-04-26T14:30:00Z",
        end: "2024-04-26T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
]

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
    }

}

export interface Deck {
    id: number;
    thematic: string;
    cards: Card[];
    updated: true | false;
}

export const deck: Deck[] = [
    {
        id: 1,
        thematic: 'La nourriture',
        updated: false,
        cards: [
            {
                id: 1,
                deck_id: 1,
                recto: 'a fork',
                verso: 'une fourchette',
                user_meta: {
                    id: 1,
                    card_id: 1,
                    user_id: 1,
                    times_reviewed: 1,
                    last_review_date: "2024-04-23",
                    last_difficulty_level: 'easy'
                }
            },
        ]
    },
]

export interface Expression {
    id: number,
    title: string,
    description: string,
    last_used_date: string | null,
}