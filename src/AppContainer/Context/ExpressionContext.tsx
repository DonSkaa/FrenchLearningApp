import { createContext } from "react"
import { Expression } from "FormatedDatabase"
import axios, { AxiosResponse } from 'axios';
import { FLA_ENDPOINT } from "AppConstantes"

interface ExpressionContextType {
    getExpressions: () => Promise<Expression[]>
    getDayExpression: () => Promise<Expression>
}

export const ExpressionContext = createContext<ExpressionContextType>({
    getExpressions: async () => [],
    getDayExpression: async () => {
        throw new Error("Not implemented")
    },
})

function ExpressionContextProvider(props: React.PropsWithChildren<{}>) {

    const getExpressions = async () => {
        const response = await axios.get(`${FLA_ENDPOINT}/expressions`)
        return response.data.data
    }

    const getDayExpression = async (): Promise<Expression> => {
        const response = await axios.get(`${FLA_ENDPOINT}/day-expression`)
        return response.data.data
    }

    return (
        <ExpressionContext.Provider value={{ getExpressions, getDayExpression }}>
            {props.children}
        </ExpressionContext.Provider>
    )
}

export default ExpressionContextProvider


