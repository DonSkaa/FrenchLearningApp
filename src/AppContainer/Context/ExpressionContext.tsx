import { Expression } from "FormatedDatabase";
import { getCallApi } from "Functions";
import { createContext } from "react";

interface ExpressionContextType {
  getDayExpression: () => Promise<Expression>;
}

export const ExpressionContext = createContext<ExpressionContextType>({
  getDayExpression: async () => {
    throw new Error("Not implemented");
  },
});

function ExpressionContextProvider(props: React.PropsWithChildren<{}>) {
  const controller = new AbortController();

  const callApi = getCallApi();

  const getDayExpression = async (): Promise<Expression> => {
    const response = await callApi(
      `/api/day-expression`,
      { method: "get" },
      controller.signal
    );
    return response.data.data;
  };

  return (
    <ExpressionContext.Provider value={{ getDayExpression }}>
      {props.children}
    </ExpressionContext.Provider>
  );
}

export default ExpressionContextProvider;
