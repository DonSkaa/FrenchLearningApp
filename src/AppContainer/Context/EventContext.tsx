import { createContext, useContext, useEffect, useState } from "react"
import { Event } from "FormatedDatabase"
import { useCallApi } from "Functions"
import { FLA_ENDPOINT } from "AppConstantes"
import { UserContext } from "./UserContext"

interface EventContextType {
    events: Event[]
}

export const EventContext = createContext<EventContextType>({
    events: [],
})

function EventContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()
    const [events, setEvents] = useState<Event[]>([])
    const userContext = useContext(UserContext)

    const callApi = useCallApi()

    const getCurrentUserEvents = async (userId: number): Promise<Event[]> => {
        const response = await callApi(`${FLA_ENDPOINT}/events`, { method: "get" }, controller.signal, { user_id: userId })
        return response.data.data
    }

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (userContext?.currentUser?.id) {
                const userEvents = await getCurrentUserEvents(userContext?.currentUser?.id)
                setEvents(userEvents)
            }
        }

        fetchUserEvents()
    }, [userContext?.currentUser])

    return (
        <EventContext.Provider value={{ events }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider
