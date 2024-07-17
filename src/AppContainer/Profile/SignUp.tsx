import { initialErrorMessages, initialErrorState } from "AppConstantes";
import { PasswordInput } from "AppContainer/Components/PasswordInput/PasswordInput";
import { PasswordRequirements } from "AppContainer/Components/PasswordRequirements/PasswordRequirements";
import {
  getCallApi,
  getTimezone,
  isAdult,
  validateEmail,
  validateName,
  validatePassword,
} from "Functions";
import { CurrentUser } from "Interfaces";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "store";

interface SignUpProps {
  setterPopUp?: (value: any) => void | null;
  type?: "teacher" | "student";
}

export const SignUp = observer(function SignUp({
  setterPopUp,
  type = "teacher",
}: SignUpProps): JSX.Element {
  const navigate = useNavigate();
  const timezone = getTimezone();
  const callApi = getCallApi();

  // const [isVisible, setIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState({
    email: false,
    password: false,
    name: false,
    last_name: false,
    date_of_birth: false,
  });
  const isFormValid = Object.values(error).every((value) => value);
  const [userData, setUserData] = useState({
    timezone: timezone,
    program_duration: "4",
    type: type,
    username: "",
    name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    password: "",
    teacher_id: type === "teacher" ? null : store?.currentUser?.id,
  });

  const updateUserDataKey = (key: string, value: string) => {
    if (key === "password") {
      setError(validatePassword(value));
      if (isFormValid) {
        setDisabled((pvsDisabled) => ({ ...pvsDisabled, password: false }));
      }
    }
    if (key === "email") {
      validateEmail(value)
        ? setDisabled((pvsDisabled) => ({ ...pvsDisabled, email: false }))
        : setDisabled((pvsDisabled) => ({ ...pvsDisabled, email: true }));
    }
    if (key === "name" || key === "last_name") {
      validateName(value)
        ? setDisabled((pvsDisabled) => ({ ...pvsDisabled, [key]: false }))
        : setDisabled((pvsDisabled) => ({ ...pvsDisabled, [key]: true }));
    }
    if (key === "date_of_birth") {
      isAdult(value)
        ? setDisabled((pvsDisabled) => ({
            ...pvsDisabled,
            date_of_birth: false,
          }))
        : setDisabled((pvsDisabled) => ({
            ...pvsDisabled,
            date_of_birth: true,
          }));
    }
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(isFormValid);

    if (!isFormValid || disabled.email) {
      if (!isFormValid) {
        setDisabled((pvsDisabled) => ({ ...pvsDisabled, password: true }));
      }
    } else {
      try {
        const res = (await callApi(
          `/api/signup`,
          { method: "post" },
          null,
          userData
        )) as { data: CurrentUser };
        if (type === "teacher") {
          void store.setUser(res.data);
          navigate("/dashboard");
        } else if (type === "student") {
          setterPopUp && setterPopUp(false);
          store.currentStudents = store.currentStudents
            ? [...store.currentStudents, res.data]
            : [res.data];
        }
      } catch (error: any) {
        if (error?.response?.data?.message === "email already taken") {
          setErrorMessages((pvsErrorMessages) => ({
            ...pvsErrorMessages,
            email:
              "Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.",
          }));
        }
        if (axios.isAxiosError(error)) {
          console.error("Erreur lors de la création de l'utilisateur", error);
        }
      }
    }
  };

  return (
    <div className="full-width flex center gap-3">
      <div className="half-width m-t-40">
        <h2>Créer un compte</h2>
        <form
          className="flex column gap-1"
          onSubmit={(x) => void handleSubmit(x)}
        >
          <div>
            <input
              placeholder="E-mail"
              value={userData.email}
              onChange={(e) => updateUserDataKey("email", e.target.value)}
              required
            />
            {disabled.email ? (
              <div className="warning">
                Cette adresse e-mail est non valide. Assurez-vous qu'elle
                respecte ce format : exemple@email.com
              </div>
            ) : null}
            {errorMessages.email && (
              <div className="warning">{errorMessages.email}</div>
            )}
          </div>
          <div>
            <input
              placeholder="Nom d'utilisateur"
              value={userData.username}
              onChange={(e) => updateUserDataKey("username", e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Nom"
              value={userData.last_name}
              onChange={(e) => updateUserDataKey("last_name", e.target.value)}
              required
            />
            {disabled.last_name ? (
              <div className="warning">Le format du nom n'est pas valide.</div>
            ) : null}
          </div>
          <div>
            <input
              placeholder="Prénom"
              value={userData.name}
              onChange={(e) => updateUserDataKey("name", e.target.value)}
              required
            />
            {disabled.name ? (
              <div className="warning">
                Le format du prénom n'est pas valide.
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="date"
              placeholder="Date de naissance"
              value={userData.date_of_birth}
              onChange={(e) =>
                updateUserDataKey("date_of_birth", e.target.value)
              }
              required
            />
            {disabled.date_of_birth ? (
              <div className="warning">
                Vous devez avoir 18 ans au minimum pour vous inscrire.
              </div>
            ) : null}
          </div>
          <PasswordInput
            className={disabled.password ? "error-border" : ""}
            updatingKey="password"
            placeholder="Mot de passe"
            value={userData.password}
            setter={updateUserDataKey}
          />
          {type === "student" ? (
            <div className="m-b-10">
              <label htmlFor="">Durée de programme</label>
              <select
                value={userData.program_duration}
                onChange={(e) =>
                  updateUserDataKey("program_duration", e.target.value)
                }
                required
              >
                <option value="4">4 semaines</option>
                <option value="12">12 semaines</option>
              </select>
            </div>
          ) : null}
          <PasswordRequirements error={error} />
          <button
            className="strong-button"
            type="submit"
            disabled={
              disabled.email ||
              disabled.password ||
              disabled.name ||
              disabled.last_name ||
              disabled.date_of_birth
            }
          >
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
});
