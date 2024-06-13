import { UserMeta } from "FormattedDatabase";
import { getCallApi } from "Functions";

const callApi = getCallApi();

export const updateUserMeta = async (updatedUserMeta: UserMeta) => {
  await callApi(`/api/user-meta`, { method: "put" }, null, {
    updatedUserMeta,
  });
};
