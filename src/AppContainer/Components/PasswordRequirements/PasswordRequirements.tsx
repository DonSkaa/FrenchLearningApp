import { initialErrorState } from "AppConstantes";
import { observer } from "mobx-react-lite";
import { RequirementItem } from "./RequirementItem";

interface PasswordRequirementsProps {
  error: typeof initialErrorState;
}

export const PasswordRequirements = observer(function PasswordRequirements({
  error,
}: PasswordRequirementsProps): JSX.Element {
  return (
    <div className="m-b-10">
      <h5 className="left m-0 m-b-10">Votre mot de passe doit comporter :</h5>
      {Object.entries({
        minLength: "12 caractères minimum",
        maxLength: "64 caractères maximum",
        hasLowerCase: "au moins une lettre minuscule",
        hasUpperCase: "au moins une lettre majuscule",
        hasNumbers: "au moins 1 chiffre",
        hasSpecialChars:
          "au moins un des caractères spéciaux suivants : ! @ # $ % ^ & * ( ) , . ? ' : { } | < > < / > ",
      }).map(([key, label]) => (
        <RequirementItem
          key={key}
          completed={error[key as keyof typeof error]}
          label={label}
        />
      ))}
    </div>
  );
});
