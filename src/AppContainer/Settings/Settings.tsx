import { initialErrorState } from "AppConstantes";
import { PasswordInput } from "AppContainer/Components/PasswordInput/PasswordInput";
import { PasswordRequirements } from "AppContainer/Components/PasswordRequirements/PasswordRequirements";
import { getCallApi, logOut, validatePassword } from "Functions";
import axios, { AxiosError } from "axios";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { store } from "store";

export const Settings = observer(function Settings(): JSX.Element {
  const callApi = getCallApi();
  const [error, setError] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const updatePasswords = (key: string, value: string) => {
    key === "newPassword" && setError(validatePassword(value));
    setPasswords((prevPasswords) => ({ ...prevPasswords, [key]: value }));
  };

  const submitNewPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...passwords,
        userId: store?.currentUser?.id,
      };
      const res = await callApi(`/api/user`, { method: "put" }, null, {
        formattedData,
      });
      if (res) {
        setErrorMessage("");
      }
    } catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === 401) {
        setErrorMessage("Mot de passe actuel incorrect");
      }
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de la connexion de l'utilisateur", error);
      }
    }
  };

  return (
    <div className="container column flex">
      <form
        className="flex start column gap-1"
        onSubmit={(x) => void submitNewPassword(x)}
      >
        <h3 className="left m-0">Modifier le mot de passe</h3>
        <PasswordInput
          placeholder="Mot de passe actuel"
          value={passwords.currentPassword}
          updatingKey="currentPassword"
          setter={updatePasswords}
        />
        {errorMessage && <div className="warning">{errorMessage}</div>}
        <PasswordInput
          placeholder="Nouveau mot de passe"
          value={passwords.newPassword}
          updatingKey="newPassword"
          setter={updatePasswords}
        />
        <PasswordRequirements error={error} />
        <button className="strong-button">Enregistrer les modifications</button>
      </form>
      <button className="strong-button" onClick={() => void logOut()}>
        Se déconnecter
      </button>
    </div>
  );
});
