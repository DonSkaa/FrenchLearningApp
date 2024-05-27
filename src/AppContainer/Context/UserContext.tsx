import React, { createContext, useEffect, useState } from "react";
import { CurrentUser } from "FormatedDatabase";
import { useCallApi } from "Functions";

interface UserContextType {
    currentUser: CurrentUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
    currentStudents: CurrentUser[] | null;
}

export const UserContext = createContext<UserContextType | null>(null)

function UserContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [currentStudents, setCurrentStudents] = useState<CurrentUser[]>([])

    const callApi = useCallApi()

    const getCurrentStudents = async (teacherId: number): Promise<CurrentUser[]> => {
        const response = await callApi(`api/users`, { method: "get" }, controller.signal, { teacher_id: teacherId })
        return response.data.data
    }

    useEffect(() => {
        const fetchCurrentStudents = async () => {
            if (currentUser && currentUser.type === 'teacher' && currentUser.id) {
                const currentStudents = await getCurrentStudents(currentUser.id)
                setCurrentStudents(currentStudents)
            }
        }
        fetchCurrentStudents()
    }, [currentUser])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, currentStudents }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
