import env from './env'

export const FLA_ENDPOINT = env.dev.FLA_ENDPOINT

interface CardLevel {
    slug: string;
    name: string;
}

export const cardLevels: CardLevel[] = [
    {
        slug: 'easy',
        name: 'Facile',
    },
    {
        slug: 'normal',
        name: 'Moyen',
    },
    {
        slug: 'hard',
        name: 'Difficile',
    },
]