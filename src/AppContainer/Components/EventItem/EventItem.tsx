import { useEffect, useState } from "react"
import "./EventItem.css"
import { Event } from "../../../FormatedDatabase"

interface TimeRemaining {
    days: number;
    hours: string;
    minutes: string;
    seconds: string;
}

export default function EventItem({ event }: { event: Event }): JSX.Element {

    const [timeRemaining, setTimeRemaining] = useState<Partial<TimeRemaining>>({});

    useEffect(() => {
        const interval = setInterval(() => {

            const targetDate = new Date(event.start)
            const now = new Date()

            const timeDifference = targetDate.getTime() - now.getTime();

            if (timeDifference > 0) {
                const seconds = Math.floor((timeDifference / 1000) % 60);
                const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
                const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
                const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

                setTimeRemaining({
                    days,
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0'),
                })

            } else {

                setTimeRemaining({
                    days: 0,
                    hours: '0',
                    minutes: '0',
                    seconds: '0',
                })

                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [event])

    return (
        <div className="event-item">
            <div>
                {event.event_type === 'lesson' ? 'Conversation' : 'Révision'}
            </div>
            <div>commence dans {timeRemaining.days ? `${timeRemaining.days} jours et` : null}
                {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds} </div>
        </div>
    )
}