import { createContext } from "react"
import { Expression } from "FormatedDatabase"
import axios from 'axios'
import { FLA_ENDPOINT } from "AppConstantes"

interface ExpressionContextType {
    getExpressions: () => Expression[];
}

export const ExpressionContext = createContext<ExpressionContextType>({
    getExpressions: () => []
})

function ExpressionContextProvider(props: React.PropsWithChildren<{}>) {

    const getExpressions = async () => {
        const response = await axios.get(`${FLA_ENDPOINT}/expressions`)
        return response.data
    }

    return (
        <ExpressionContext.Provider value={{ getExpressions }}>
            {props.children}
        </ExpressionContext.Provider>
    )
}

export default ExpressionContextProvider


