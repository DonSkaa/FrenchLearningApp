export const user = [
    {
        id: 1,
        name: 'Jean',
        last_name: 'Dupont',
        mail: 'jean.dupont@gmail.com',
        password: '1234',
        user_program_id: 1,
    },
]

export const event = [
    {
        id: 1,
        event_type: 'lesson',
        date: "2024-04-24",
        start: "2024-04-24T14:30:00Z",
        end: "2024-05-24T15:30:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 2,
        event_type: 'studying',
        date: "2024-05-22",
        start: null,
        end: null,
        meeting_link: null,
    },
]

export const user_program = [
    {
        id: 1,
        user_id: 1,
        program_id: 1,
        start_date: "2024-04-01",
        end_date: "2024-04-28",
        status: 1,
    }
]

export const program = [
    {
        id: 1,
        days_duration: 28,
        thematics: [
            {
                id: 1,
                name: 'Nourriture',
                week_number: 1,
                deck_id: 1,
            },
            {
                id: 2,
                name: 'Travail',
                week_number: 2,
                deck_id: 2,
            },
            {
                id: 3,
                name: 'Transport',
                week_number: 3,
                deck_id: 3,
            },
            {
                id: 4,
                name: 'Sport',
                week_number: 4,
                deck_id: 4,
            }
        ]
    },
]

export const deck = [
    {
        id: 1,
        name: 'Nourriture',
    },
    {
        id: 2,
        name: 'Travail',
    },
    {
        id: 3,
        name: 'Transport',
    },
]

export const card = [
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
    { id: 3, deck_id: 1, recto: 'the dining room', verso: 'la salle à manger', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 4, deck_id: 1, recto: 'prepare the meal', verso: 'préparer le repas', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 5, deck_id: 2, recto: 'apply', verso: 'candidater', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 6, deck_id: 2, recto: 'take time off', verso: 'prendre des congés', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 7, deck_id: 2, recto: 'payslip', verso: 'fiche de paie', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 8, deck_id: 3, recto: 'take the train', verso: 'prendre le train', times_reviewed: 0, last_review_date: null, last_difficulty_level: null },
    { id: 9, deck_id: 3, recto: 'buy a bus ticket', verso: 'acheter un ticket de bus', times_reviewed: 0, last_review_date: null, last_difficulty_level: null }
]

