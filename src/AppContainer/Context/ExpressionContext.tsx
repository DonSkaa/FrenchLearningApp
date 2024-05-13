import { createContext } from "react"
import { Expression } from "FormatedDatabase"
import { FLA_ENDPOINT } from "AppConstantes"
import { useCallApi } from "Functions"

interface ExpressionContextType {
    getDayExpression: () => Promise<Expression>
}

export const ExpressionContext = createContext<ExpressionContextType>({
    getDayExpression: async () => {
        throw new Error("Not implemented")
    },
})

function ExpressionContextProvider(props: React.PropsWithChildren<{}>) {

    const controller = new AbortController()

    const callApi = useCallApi()

    const getDayExpression = async (): Promise<Expression> => {
        const response = await callApi(`${FLA_ENDPOINT}/day-expression`, { method: "get" }, controller.signal)

        return response.data.data
    }

    return (
        <ExpressionContext.Provider value={{ getDayExpression }}>
            {props.children}
        </ExpressionContext.Provider>
    )
}

export default ExpressionContextProvider


