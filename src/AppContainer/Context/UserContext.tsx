import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FLA_ENDPOINT } from "AppConstantes"
// import { useMsal } from "@azure/msal-react";
import axios from "axios"

interface UserContextType {
}

export const UserContext = createContext<UserContextType>({})

function UserContextProvider(props: React.PropsWithChildren<{}>) {

    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState()
    // const { inProgress, accounts } = useMsal()

    const accessTokenRequest = {
        scopes: ["user.read"],
    }

    const getToken = () =>
        new Promise((resolve, reject) => {
            try {
                const storedToken = localStorage.getItem("token");

                if (storedToken) {
                    const tokenExpirationDate = new Date(JSON.parse(storedToken).expiresIn);
                    const currentTime = new Date()

                    if (tokenExpirationDate > currentTime) {
                        resolve(JSON.parse(storedToken).token)
                    } else {
                        localStorage.removeItem("token")
                        navigate("/login")
                        location.reload()
                        reject(Error)
                    }
                }
            } catch (e) {
                reject(e)
            }
        })

    // useEffect(() => {
    //     const controller = new AbortController()
    //     getToken().then((token) => {
    //         const APIoptions = {
    //             method: "get",
    //             headers: { Authorization: token },
    //             signal: controller.signal,
    //             url: `${FLA_ENDPOINT}/user/me`,
    //         }
    //         axios(APIoptions)
    //             .then((res) => {
    //                 setUserInfo(res.data.data)
    //             })
    //             .catch((error) => {
    //                 if (error.code !== "ERR_CANCELED") {
    //                     console.log(error)
    //                 }
    //             })
    //     })
    //     return () => {
    //         controller.abort()
    //     }
    // }, [])

    return (
        <UserContext.Provider value={getToken}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider