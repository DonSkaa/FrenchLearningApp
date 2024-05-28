import { createContext, useContext, useEffect, useState } from "react"
import { Event, EventPostData } from "FormatedDatabase"
import { useCallApi } from "Functions"
import { FLA_ENDPOINT } from "AppConstantes"
import { UserContext } from "./UserContext"

interface EventContextType {
    events: Event[],
    addEvent: (newEvent: EventPostData) => void
}

export const EventContext = createContext<EventContextType>({
    events: [],
    addEvent: () => { }
})

function EventContextProvider(props: React.PropsWithChildren<{}>) {

    const [events, setEvents] = useState<Event[]>([])
    const userContext = useContext(UserContext)

    const callApi = useCallApi()

    const addEvent = async (newEvent: EventPostData) => {
        callApi(`/api/event`, { method: "post" }, null, { data: newEvent })
            .then(res => setEvents([...events, res.data.data]))
    }

    const getCurrentUserEvents = async (userId: number, controller: any): Promise<Event[]> => {
        const response = await callApi(`/api/events`, { method: "get" }, controller.signal, { user_id: userId })
        return response.data.data
    }

    useEffect(() => {
        const controller = new AbortController()
        const fetchUserEvents = async () => {
            if (userContext?.currentUser?.id) {
                const userEvents = await getCurrentUserEvents(userContext.currentUser.id, controller)
                setEvents(userEvents)
            }
        }
        fetchUserEvents()
        return () => {
            controller.abort()
        }
    }, [userContext?.currentUser])

    return (
        <EventContext.Provider value={{ events, addEvent }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider
