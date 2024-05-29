import { useEffect, useState } from "react"
import "./EventItem.css"
import { Event } from "../../../FormatedDatabase"
import Skeleton from "../Skeleton/Skeleton";

interface TimeRemaining {
    days: number;
    hours: string;
    minutes: string;
    seconds: string;
}

export default function EventItem({ event }: { event: Event }): JSX.Element {

    const [timeRemaining, setTimeRemaining] = useState<Partial<TimeRemaining>>({});
    const [isNow, setIsNow] = useState<true | false>(false)

    useEffect(() => {
        if (timeRemaining.days === 0 && timeRemaining.hours === '0' && timeRemaining.minutes === '0' && timeRemaining.seconds === '0') {
            setIsNow(true)
        } else {
            setIsNow(false)
        }
    }, [timeRemaining])

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
        <>
            {timeRemaining.hasOwnProperty('days')
                ? <a
                    className={isNow ? "link-button" : "link-button link-desactivated"}
                    href={isNow ? event.meeting_link : '#'}
                    target="blank"
                >
                    <div className={isNow ? "flex align-center event-item now" : "flex align-center event-item"}>
                        <div>
                            {event.user ? <div>{event.user.name}</div> : null}
                            <div>{event.title}</div>
                        </div>
                        {!isNow
                            ? <div>
                                commence dans : {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
                            </div>
                            : <div>Accéder</div>}
                    </div>
                </a>
                : <Skeleton
                    height={"65px"}
                />}
        </>
    )
}