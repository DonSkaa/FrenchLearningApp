import { loadDayExpression } from "AppContainer/Context/ExpressionContext";
import { useEffect } from "react";
import { store } from "store";

export default function DayExpression() {
  useEffect(() => {
    loadDayExpression();
  }, []);

  return (
    <>
      {store.expression ? (
        <div className="grey-border flex column gap-1">
          <h4 className="p-0 m-0 left"> EXPRESSION DU JOUR</h4>
          <h3 className="p-0 m-0 left">{store.expression.title}</h3>
          <div className="description">{store.expression.description}</div>
        </div>
      ) : null}
    </>
  );
}
