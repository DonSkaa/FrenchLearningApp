import env from './env'

export const FLA_ENDPOINT = env.dev.FLA_ENDPOINT

interface CardLevel {
    slug: string;
    name: string;
}

interface MenuItem {
    to: string;
    name: string;
    icon: string;
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

export const studentMenu: MenuItem[] = [
    { to: "/dashboard", name: "accueil", icon: "/assets/home.png" },
    { to: "/schedule", name: "agenda", icon: "/assets/schedule.png" },
    { to: "/flashcards", name: "fiches", icon: "/assets/flashcards.png" },
    { to: "/profile", name: "profil", icon: "/assets/perfil.png" },
]

export const teacherMenu: MenuItem[] = [
    { to: "/dashboard", name: "accueil", icon: "/assets/home.png" },
    { to: "/students", name: "élèves", icon: "/assets/students.png" },
    { to: "/profile", name: "profil", icon: "/assets/perfil.png" },
]
