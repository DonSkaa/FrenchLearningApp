export const user = [
    {
        id: 1,
        name: 'Jean',
        last_name: 'Dupont',
        mail: 'jean.dupont@gmail.com',
        password: '1234',
    },
]

export const event = [
    {
        id: 1,
        event_type: 'lesson',
        start: "2024-05-22T14:30:00Z",
        end: "2024-05-22T15:30:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    {
        id: 2,
        event_type: 'studying',
        date: "2024-05-22",
    },
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
    { id: 1, deck_id: 1, recto: 'a fork', verso: 'une fourchette', status: 'revised' },
    { id: 2, deck_id: 1, recto: 'a plate', verso: 'une assiette', status: 'revised' },
    { id: 3, deck_id: 1, recto: 'the dining room', verso: 'la salle à manger', status: 'revised' },
    { id: 4, deck_id: 1, recto: 'prepare the meal', verso: 'préparer le repas', status: 'revised' },
    { id: 5, deck_id: 2, recto: 'apply', verso: 'candidater', status: 'revised' },
    { id: 6, deck_id: 2, recto: 'take time off', verso: 'prendre des congés', status: 'revised' },
    { id: 7, deck_id: 2, recto: 'payslip', verso: 'fiche de paie', status: 'revised' },
    { id: 8, deck_id: 3, recto: 'take the train', verso: 'prendre le train', status: 'review' },
    { id: 9, deck_id: 3, recto: 'buy a bus ticket', verso: 'acheter un ticket de bus', status: 'review' }
]

