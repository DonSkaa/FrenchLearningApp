import { createContext } from "react"
import { UserMeta } from "FormatedDatabase"
import { useCallApi } from "Functions"

interface UserMetaContextType {
    updateUserMeta: (updatedUserMeta: UserMeta) => Promise<UserMeta>
}

export const UserMetaContext = createContext<UserMetaContextType>({
    updateUserMeta: async (updatedUserMeta: UserMeta) => {
        throw new Error("Not implemented")
    },
})

function UserMetaContextProvider(props: React.PropsWithChildren<{}>) {

    const callApi = useCallApi()

    const updateUserMeta = async (updatedUserMeta: UserMeta): Promise<UserMeta> => {
        const response = await callApi(`/api/user-meta`, { method: "put" }, null, { updatedUserMeta })
        return response.data.data
    }

    return (
        <UserMetaContext.Provider value={{ updateUserMeta }}>
            {props.children}
        </UserMetaContext.Provider>
    )
}

export default UserMetaContextProvider
