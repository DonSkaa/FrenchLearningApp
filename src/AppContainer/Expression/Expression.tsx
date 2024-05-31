import { getDayExpression } from "AppContainer/Context/ExpressionContext";
import { Expression } from "FormatedDatabase";
import { useContext, useEffect, useState } from "react";
import { store } from "store";

export default function DayExpression() {
  useEffect(() => {
    getDayExpression();
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
