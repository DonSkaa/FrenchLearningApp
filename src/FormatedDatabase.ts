export interface User {
    id: number;
    name: string;
    last_name: string;
    mail: string;
    password: string;
    user_program_id: number;
}

export const user: User[] = [
    {
        id: 1,
        name: 'Jean',
        last_name: 'Dupont',
        mail: 'jean.dupont@gmail.com',
        password: '1234',
        user_program_id: 1,
    },
]

export interface Event {
    id: number;
    event_type: string;
    date: string;
    start: string;
    end: string;
    meeting_link: string;
}

export const event: Event[] = [
    {
        id: 1,
        event_type: 'lesson',
        date: "2024-04-24",
        start: "2024-04-24T14:30:00Z",
        end: "2024-05-24T15:30:00Z",
        meeting_link: "https://meet.google.com/aku-afqa-vmq",
    },
    // {
    //     id: 2,
    //     event_type: 'studying',
    //     date: "2024-05-22",
    //     start: null,
    //     end: null,
    //     meeting_link: null,
    // },
]

export interface UserProgram {
    id: number;
    user_id: number;
    program_id: number;
    start_date: string;
    end_date: string;
    status: number;
}

export const user_program: UserProgram[] = [
    {
        id: 1,
        user_id: 1,
        program_id: 1,
        start_date: "2024-04-23",
        end_date: "2024-05-20",
        status: 1,
    }
]

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
    name: string;
    cards: Card[],
}

export const deck: Deck[] = [
    {
        id: 1,
        name: 'Nourriture',
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
        name: 'Travail',
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
        name: 'Transport',
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
]

export interface Expression {
    id: number;
    title: string;
    description: string,
}

export const expression: Expression[] = [
    {
        id: 1,
        title: "Prendre ses jambes à son cou",
        description: "Fuir rapidement. Cela décrit l'action de courir très vite, comme si l'on portait ses jambes pour s'échapper."
    },
    {
        id: 2,
        title: "Tomber dans les pommes",
        description: "Signifie s'évanouir. L'origine de cette expression vient d'un jeu de mots sur le terme \"pâmer\", qui signifie aussi s'évanouir."
    },
    {
        id: 3,
        title: "Appeler un chat un chat",
        description: "Dire les choses franchement, sans détour. Cela signifie nommer les choses par leur vrai nom, sans embellissement."
    },
    {
        id: 4,
        title: "Mettre son grain de sel",
        description: "Intervenir ou donner son avis sans y être invité. Cela évoque l'idée d'ajouter un élément qui n'était pas nécessaire."
    },
    {
        id: 5,
        title: "Casser les pieds à quelqu'un",
        description: "Ennuyer ou importuner quelqu'un. Cela indique le fait de causer de la gêne ou de l'irritation."
    },
    {
        id: 6,
        title: "Avoir un coup de foudre",
        description: "Tomber amoureux immédiatement. Cela fait référence à l'idée d'être frappé par une émotion intense, comme un éclair."
    },
    {
        id: 7,
        title: "Être dans le pétrin",
        description: "Se trouver dans une situation difficile ou embarrassante. Cela vient du \"pétrin\", le contenant où l'on pétrit le pain, évoquant quelque chose de collant ou d'enchevêtré."
    },
    {
        id: 8,
        title: "Avoir la tête dans les nuages",
        description: "Être distrait ou rêveur. Cela signifie être absorbé dans ses pensées ou ses rêves, sans être vraiment présent."
    },
    {
        id: 9,
        title: "Prendre quelqu'un la main dans le sac",
        description: "Attraper quelqu'un en flagrant délit. Cette expression suggère que la personne a été prise en train de faire quelque chose de mal."
    },
    {
        id: 10,
        title: "Tourner autour du pot",
        description: "Ne pas aller directement au but ou hésiter à dire quelque chose. Cela signifie éviter de parler clairement ou d'aborder le sujet principal."
    },
]