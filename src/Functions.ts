import { Card } from "FormatedDatabase";

export function calculateProgress(start_date: string, end_date: string): number {
    // Convertir les dates en objets Date
    const start = new Date(start_date)
    const end = new Date(end_date)
    const current = new Date()

    // Calcul de la durée totale et de la durée écoulée
    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = current.getTime() - start.getTime();

    // Calcul du pourcentage d'avancement
    let progress = (elapsedDuration / totalDuration) * 100

    // Limiter le pourcentage entre 0 et 100
    if (progress < 0) {
        progress = 0
    } else if (progress > 100) {
        progress = 100
    }

    // Retourner le pourcentage arrondi à deux chiffres après la virgule
    return Math.round(progress)
}

export function addDays(date: string | null, daysToAdd: number): Date {
    const newDate = new Date(date!)
    newDate.setTime(newDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
    return newDate
}

export function isToReview(card: Card): Card | undefined {
    if (card.times_reviewed === 0 && !card.last_review_date && !card.last_difficulty_level) {
        return card;
    } else {
        let intervalRevision: number;

        switch (card.last_difficulty_level) {
            case 'easy':
                intervalRevision = 5;
                break;
            case 'normal':
                intervalRevision = 3;
                break;
            case 'hard':
                intervalRevision = 1;
                break;
            default:
                throw new Error(`Niveau de difficulté inconnu: ${card.last_difficulty_level}`)
        }

        const newRevisionDate = addDays(card.last_review_date, intervalRevision);

        if (newRevisionDate.getTime() === new Date().getTime()) {
            return card
        }
    }

    return undefined;
}