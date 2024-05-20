import React, { createContext, useContext, useEffect, useState } from "react"
import { UserProgram } from "FormatedDatabase"
import { UserContext } from "./UserContext"
import { useCallApi } from "Functions"
import { FLA_ENDPOINT } from "AppConstantes"

interface UserProgramContextType {
    currentUserProgram: UserProgram | null;
    setCurrentUserProgram: React.Dispatch<React.SetStateAction<UserProgram | null>>
}

export const UserProgramContext = createContext<UserProgramContextType | null>(null)

function UserProgramContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()
    const [currentUserProgram, setCurrentUserProgram] = useState<UserProgram | null>(null)
    const userContext = useContext(UserContext)
    const callApi = useCallApi()

    const getCurrentUserProgram = async (userId: number): Promise<UserProgram> => {
        const response = await callApi(`/api/user-program`, { method: "get" }, controller.signal, { user_id: userId })
        return response.data.data
    }

    useEffect(() => {
        const fetchUserProgram = async () => {
            if (userContext?.currentUser?.id) {
                const userProgram = await getCurrentUserProgram(userContext?.currentUser?.id)
                setCurrentUserProgram(userProgram)
            }
        }
        fetchUserProgram()
    }, [userContext?.currentUser])

    return (
        <UserProgramContext.Provider value={{ currentUserProgram, setCurrentUserProgram }}>
            {props.children}
        </UserProgramContext.Provider>
    )
}

export default UserProgramContextProvider
