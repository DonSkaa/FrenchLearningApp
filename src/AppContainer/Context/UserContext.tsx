import React, { createContext, useEffect, useState } from "react";
import { CurrentUser } from "FormatedDatabase";

interface UserContextType {
    currentUser: CurrentUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

function UserContextProvider(props: React.PropsWithChildren<{}>) {

    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
