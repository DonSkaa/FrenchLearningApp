import { Expression, expression } from "FormatedDatabase"
import { useEffect, useState } from "react"

export default function DayExpression() {

    const [currentExpression, setCurrentExpression] = useState<Expression | undefined>(undefined)

    useEffect(() => {
        // FUTUR 
        //   axios.get('/api/expression').then((response) => {
        //     setExpression(response.data)
        //   })

        // waiting back end
        setCurrentExpression(expression[0])

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