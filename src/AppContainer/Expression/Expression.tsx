import { ExpressionContext } from "AppContainer/Context/ExpressionContext"
import { Expression } from "FormatedDatabase"
import { useContext, useEffect, useState } from "react"

export default function DayExpression() {

    const [currentExpression, setCurrentExpression] = useState<Expression | undefined>(undefined)
    const { getDayExpression } = useContext(ExpressionContext)

    useEffect(() => {
        getDayExpression()
            .then(res => {
                setCurrentExpression(res)
            })
            .catch(error => console.error("Error fetching expressions:", error))
    }, [])

    return (
        <>
            {
                currentExpression
                    ? <div className="grey-border flex column gap-1">
                        <h4 className="p-0 m-0 left"> EXPRESSION DU JOUR</h4>
                        <h3 className="p-0 m-0 left">{currentExpression.title}</h3>
                        <div className="description">{currentExpression.description}</div>
                    </div>
                    : null
            }
        </>
    )
}