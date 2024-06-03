import { UserMeta } from "FormattedDatabase";
import { getCallApi } from "Functions";

const callApi = getCallApi();

export const updateUserMeta = async (
  updatedUserMeta: UserMeta
): Promise<UserMeta> => {
  const response: { data: { data: UserMeta } } = await callApi(
    `/api/user-meta`,
    { method: "put" },
    null,
    {
      updatedUserMeta,
    }
  );
  return response?.data?.data;
};
