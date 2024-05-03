import { ExpressionContext } from "AppContainer/Context/ExpressionContext"
import { Expression, expression } from "FormatedDatabase"
import { useContext, useEffect, useState } from "react"

export default function DayExpression() {

    const [currentExpression, setCurrentExpression] = useState<Expression | undefined>(undefined)
    const { getExpressions } = useContext(ExpressionContext)

    useEffect(() => {
        setCurrentExpression(getExpressions())
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