import { UserMeta } from "FormattedDatabase";
import { useCallApi } from "Functions";

const callApi = useCallApi();

export const updateUserMeta = async (
  updatedUserMeta: UserMeta
): Promise<UserMeta> => {
  const response = await callApi(`/api/user-meta`, { method: "put" }, null, {
    updatedUserMeta,
  });
  return response.data.data;
};
