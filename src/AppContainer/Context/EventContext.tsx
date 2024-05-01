import { createContext, useEffect, useState } from "react"
import { event, Event } from "FormatedDatabase"

interface EventContextType {
    events: Event[];
    getEvents: (userId: number) => Event[] | [];
}

export const EventContext = createContext<EventContextType>({
    events: [],
    getEvents: () => [],
})

function EventContextProvider(props: React.PropsWithChildren<{}>) {

    const [events, setEvents] = useState<Event[]>(event)

    useEffect(() => {
        const userEvents = getEvents(1)
        setEvents(userEvents)
    }, [])

    useEffect(() => {
        console.log(event);
    }, [event])

    const getEvents = (userId: number) => {
        return events.filter(event => event.user_id === userId)
    }

    return (
        <EventContext.Provider value={{ events, getEvents }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider


