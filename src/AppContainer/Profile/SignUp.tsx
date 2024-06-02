import { initialErrorMessages, initialErrorState } from "AppConstantes";
import PasswordInput from "AppContainer/Components/PasswordInput/PasswordInput";
import PasswordRequirements from "AppContainer/Components/PasswordRequirements/PasswordRequirements";
import { getCallApi, validateEmail, validatePassword } from "Functions";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "store";

interface SignUpProps {
  setter?: (value: any) => void | null;
  setterPopUp?: (value: any) => void | null;
  type?: "teacher" | "student";
}

export default function SignUp({
  setter,
  setterPopUp,
  type = "teacher",
}: SignUpProps): JSX.Element {
  const navigate = useNavigate();
  const callApi = getCallApi();

  // const [isVisible, setIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);
  const [error, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState({ email: false, password: false });
  const isFormValid = Object.values(error).every((value) => value);
  const [userData, setUserData] = useState({
    program_duration: "",
    type: type,
    name: "",
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
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid || disabled.email) {
      if (!isFormValid) {
        setDisabled((pvsDisabled) => ({ ...pvsDisabled, password: true }));
      }
    } else {
      try {
        const res = await callApi(
          `/api/signup`,
          { method: "post" },
          null,
          userData
        );
        if (type === "teacher") {
          const userData = res.data;
          setter && setter(true);
          store.currentUser = userData;
          // if (userContext) {
          //   userContext.setCurrentUser(userData);
          // }
          navigate("/dashboard");
        } else if (type === "student") {
          setterPopUp && setterPopUp(false);
          store.currentStudents = store.currentStudents
            ? [...store.currentStudents, res.data]
            : [res.data];
          // userContext?.setCurrentStudents((prevStudents) =>
          //   prevStudents ? [...prevStudents, res.data] : [res.data]
          // );
        }
      } catch (error: any) {
        if (error?.response?.data?.message === "email already taken") {
          setErrorMessages((pvsErrorMessages) => ({
            ...pvsErrorMessages,
            email:
              "Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.",
          }));
        }
        setter && setter(false);
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
        <form className="flex column gap-1" onSubmit={handleSubmit}>
          {type === "student" ? (
            <div className="m-b-10">
              <select
                value={userData.program_duration}
                onChange={(e) =>
                  updateUserDataKey("program_duration", e.target.value)
                }
                required
              >
                <option value="28">28 jours</option>
                <option value="84">84 jours</option>
              </select>
            </div>
          ) : null}
          <div>
            <input
              placeholder="Nom d'utilisateur"
              value={userData.name}
              onChange={(e) => updateUserDataKey("name", e.target.value)}
              required
            />
          </div>
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
          <PasswordInput
            className={disabled.password ? "error-border" : ""}
            updatingKey="password"
            placeholder="Mot de passe"
            value={userData.password}
            setter={updateUserDataKey}
          />
          {/* <div className="relative">
            <input
              className={disabled.password ? "error-border" : ""}
              type={isVisible ? "text" : "password"}
              placeholder="Mot de passe"
              value={userData.password}
              onChange={(e) => updateUserDataKey("password", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="input-icon-btn"
            >
              {isVisible ? (
                <img
                  alt="Masquer le mot de passe"
                  src="assets/not-visible.png"
                ></img>
              ) : (
                <img
                  alt="Afficher le mot de passe"
                  src="assets/visible.png"
                ></img>
              )}
            </button>
          </div> */}
          <PasswordRequirements error={error} />
          <button className="strong-button" type="submit">
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
}
