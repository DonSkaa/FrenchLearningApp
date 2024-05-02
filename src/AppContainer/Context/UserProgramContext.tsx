import { createContext, useEffect, useState } from "react"
import { UserProgram } from "FormatedDatabase"

interface UserProgramContextType {
    userProgram: UserProgram[];
}

export const UserProgramContext = createContext<UserProgramContextType>({
    userProgram: [],
})

function UserProgramContextProvider(props: React.PropsWithChildren<{}>) {

    const [userProgram, setUserProgram] = useState<UserProgram[]>([])

    return (
        <UserProgramContext.Provider value={{ userProgram }}>
            {props.children}
        </UserProgramContext.Provider>
    )
}

export default UserProgramContextProvider


