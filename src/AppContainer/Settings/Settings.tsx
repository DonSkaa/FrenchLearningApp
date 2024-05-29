import { FormEvent, useContext, useState } from "react";
import { UserContext } from "AppContainer/Context/UserContext";
import PasswordInput from "AppContainer/Components/PasswordInput/PasswordInput";
import PasswordRequirements from "AppContainer/Components/PasswordRequirements/PasswordRequirements";
import { initialErrorState } from "AppConstantes";
import { useCallApi, validatePassword } from "Functions";
import axios, { AxiosError } from "axios";

interface SettingsProps {
  setter?: (value: any) => void | null;
}

export default function Settings({ setter }: SettingsProps): JSX.Element {
  const userContext = useContext(UserContext);
  const callApi = useCallApi();
  const [error, setError] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const logOutFunc = () => {
    if (userContext) {
      userContext.logout();
      setter && setter(false);
    }
  };

  const updatePasswords = (key: string, value: string) => {
    key === "newPassword" && setError(validatePassword(value));
    setPasswords((prevPasswords) => ({ ...prevPasswords, [key]: value }));
  };

  const submitNewPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formatedData = {
        ...passwords,
        userId: userContext?.currentUser?.id,
      };
      const res = await callApi(`/api/user`, { method: "put" }, null, {
        formatedData,
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
    <div className="full-width flex column m-4">
      <form className="flex start column gap-1" onSubmit={submitNewPassword}>
        <h3 className="left m-b-0">Modifier le mot de passe</h3>
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
      <button className="strong-button m-t-40" onClick={logOutFunc}>
        Se déconnecter
      </button>
    </div>
  );
}
