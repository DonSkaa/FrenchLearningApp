export function calculateProgress(start_date, end_date) {
    // Convertir les dates en objets Date
    const start = new Date(start_date)
    const end = new Date(end_date)
    const current = new Date()

    // Calcul de la durée totale et de la durée écoulée
    const totalDuration = end - start
    const elapsedDuration = current - start

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

function addDays(date, daysToAdd) {
    return new Date(date).getTime() + daysToAdd * 24 * 60 * 60 * 1000
}

export function isToReview(card) {
    if (card.times_reviewed === 0) {
        return card
    } else {
        let intervalRevision
        if (card.last_difficulty_level === 'easy') {
            intervalRevision = 5
        }
        if (card.last_difficulty_level === 'normal') {
            intervalRevision = 3
        }
        if (card.last_difficulty_level === 'hard') {
            intervalRevision = 1
        }

        const newRevisionDate = addDays(card.last_review_date, intervalRevision)

        if (newRevisionDate === new Date()) {
            console.log('le nouvelle date c ajd');
            return card
        }
    }
}