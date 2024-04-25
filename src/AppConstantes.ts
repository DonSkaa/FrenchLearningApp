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