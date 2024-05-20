export interface User {
    id: number;
    name: string;
    last_name: string;
    profile_image_path: string;
    mail: string;
    password: string;
    user_program_id: number;
}

export const user: User[] = [
    {
        id: 1,
        name: 'Jean',
        last_name: 'Dupont',
        profile_image_path: '',
        mail: 'jean.dupont@gmail.com',
        password: '1234',
        user_program_id: 1,
    },
]

export interface CurrentUser {
    id: number;
    name: string;
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
    {
        id: 3,
        user_id: 1,
        event_type: 'lesson',
        title: 'Conversation',
        date: "2024-05-01",
        start: "2024-05-01T14:30:00Z",
        end: "2024-05-01T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 4,
        user_id: 1,
        event_type: 'lesson',
        title: 'Mise en situation',
        date: "2024-05-01",
        start: "2024-05-03T14:30:00Z",
        end: "2024-05-03T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 5,
        user_id: 1,
        event_type: 'lesson',
        title: 'Conversation',
        date: "2024-05-01",
        start: "2024-05-08T14:30:00Z",
        end: "2024-05-08T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 6,
        user_id: 1,
        event_type: 'lesson',
        title: 'Mise en situation',
        date: "2024-05-01",
        start: "2024-05-10T14:30:00Z",
        end: "2024-05-10T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 7,
        user_id: 1,
        event_type: 'lesson',
        title: 'Conversation',
        date: "2024-05-01",
        start: "2024-05-15T14:30:00Z",
        end: "2024-05-15T15:00:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 8,
        user_id: 1,
        event_type: 'lesson',
        title: 'Mise en situation',
        date: "2024-05-01",
        start: "2024-05-17T14:30:00Z",
        end: "2024-05-17T15:00:00Z",
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

export const user_program: UserProgram =
{
    id: 1,
    user_id: 1,
    program_id: 1,
    start_date: "2024-04-23",
    end_date: "2024-05-20",
    deck_ids: [1, 2, 3, 4],
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

export const program: Program[] = [
    {
        id: 1,
        days_duration: 28,
        thematics: [
            {
                id: 1,
                name: 'La nourriture',
                week_number: 1,
                deck_id: 1,
            },
            {
                id: 2,
                name: 'Le travail',
                week_number: 2,
                deck_id: 2,
            },
            {
                id: 3,
                name: 'Les transports',
                week_number: 3,
                deck_id: 3,
            },
            {
                id: 4,
                name: 'La salle de sport',
                week_number: 4,
                deck_id: 4,
            },
            {
                id: 5,
                name: 'La plage',
                week_number: 5,
                deck_id: 5,
            },
            {
                id: 6,
                name: 'La ville',
                week_number: 6,
                deck_id: 6,
            },
            {
                id: 7,
                name: 'La fête',
                week_number: 7,
                deck_id: 7,
            },
            {
                id: 8,
                name: 'La cuisine',
                week_number: 8,
                deck_id: 8,
            }
        ]
    },
]

export interface Card {
    id: number;
    deck_id: number;
    recto: string;
    verso: string;
    times_reviewed: number;
    last_review_date: string | null;
    last_difficulty_level: string | null;

}

export interface Deck {
    id: number;
    thematic: string;
    cards: Card[],
}

export const deck: Deck[] = [
    {
        id: 1,
        thematic: 'La nourriture',
        cards: [
            {
                id: 1,
                deck_id: 1,
                recto: 'a fork',
                verso: 'une fourchette',
                times_reviewed: 1,
                last_review_date: "2024-04-23",
                last_difficulty_level: 'easy'
            },
            {
                id: 2,
                deck_id: 1,
                recto: 'a plate',
                verso: 'une assiette',
                times_reviewed: 1,
                last_review_date: "2024-04-23",
                last_difficulty_level: 'hard'
            },
            {
                id: 3,
                deck_id: 1,
                recto: 'the dining room',
                verso: 'la salle à manger',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
            {
                id: 4,
                deck_id: 1,
                recto: 'prepare the meal',
                verso: 'préparer le repas',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
        ]
    },
    {
        id: 2,
        thematic: 'Le travail',
        cards: [
            {
                id: 5,
                deck_id: 2,
                recto: 'apply',
                verso: 'candidater',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
            {
                id: 6,
                deck_id: 2,
                recto: 'take time off',
                verso: 'prendre des congés',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
            {
                id: 7,
                deck_id: 2,
                recto: 'payslip',
                verso: 'fiche de paie',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
        ]
    },
    {
        id: 3,
        thematic: 'Les transports',
        cards: [
            {
                id: 8,
                deck_id: 3,
                recto: 'take the train',
                verso: 'prendre le train',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
            {
                id: 9,
                deck_id: 3,
                recto: 'buy a bus ticket',
                verso: 'acheter un ticket de bus',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            }
        ]
    },
    {
        id: 4,
        thematic: 'La salle de sport',
        cards: [
            {
                id: 10,
                deck_id: 4,
                recto: 'go to the gym',
                verso: 'aller à la salle',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            },
            {
                id: 11,
                deck_id: 4,
                recto: 'bench press',
                verso: 'développé couché',
                times_reviewed: 0,
                last_review_date: null,
                last_difficulty_level: null
            }
        ]
    },
]

export interface Expression {
    id: number,
    title: string,
    description: string,
    last_used_date: string | null,
}