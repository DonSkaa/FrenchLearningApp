import { initialErrorState } from "AppConstantes";
import RequirementItem from "./RequirementItem";

interface PasswordRequirementsProps {
  error: typeof initialErrorState;
}

export default const PasswordRequirements = observer(function PasswordRequirements({
  error,
}: PasswordRequirementsProps): JSX.Element {
  return (
    <div className="m-b-10">
      <h5 className="left m-0 m-b-10">
        Votre mot de passe doit comporter au moins :
      </h5>
      {Object.entries({
        hasUpperCase: "Une lettre majuscule",
        minLength: "12 caractères",
        hasNumbers: "1 chiffre",
        hasSpecialChars: "Un caractère spécial (exemple :  # ? ! &)",
      }).map(([key, label]) => (
        <RequirementItem
          key={key}
          completed={error[key as keyof typeof error]}
          label={label}
        />
      ))}
    </div>
  );
})
