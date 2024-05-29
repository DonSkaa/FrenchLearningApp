import React, { SetStateAction, createContext, useEffect, useState } from "react";
import { CurrentUser } from "FormatedDatabase";
import { useCallApi } from "Functions";

interface UserContextType {
    currentUser: CurrentUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
    currentStudents: CurrentUser[] | null;
    setCurrentStudents: React.Dispatch<React.SetStateAction<CurrentUser[] | null>>
    logout: () => void
}

export const UserContext = createContext<UserContextType | null>({
    currentUser: null,
    setCurrentUser: function (value: SetStateAction<CurrentUser | null>): void {
        throw new Error("Function not implemented.")
    },
    currentStudents: null,
    setCurrentStudents: function (value: SetStateAction<CurrentUser[] | null>): void {
        throw new Error("Function not implemented.")
    },
    logout: function (): void {
        throw new Error("Function not implemented.")
    }
})

function UserContextProvider(props: React.PropsWithChildren<{}>) {

    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [currentStudents, setCurrentStudents] = useState<CurrentUser[] | null>(null)

    const callApi = useCallApi()

    const getCurrentStudents = async (teacherId: number, controller: any): Promise<CurrentUser[]> => {
        const response = await callApi(`api/users`, { method: "get" }, controller.signal, { teacher_id: teacherId })
        return response.data.data
    }

    useEffect(() => {
        const controller = new AbortController()

        const fetchCurrentStudents = async () => {
            if (currentUser && currentUser.type === 'teacher' && currentUser.id) {
                const currentStudents = await getCurrentStudents(currentUser.id, controller)
                setCurrentStudents(currentStudents)
            }
        }
        fetchCurrentStudents()
        return () => {
            controller.abort()
        }
    }, [currentUser])


    const logout = () => {
        setCurrentUser(null)
    }


    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, currentStudents, setCurrentStudents, logout }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
