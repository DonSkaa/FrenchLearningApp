import { observer } from "mobx-react-lite";
import { useState } from "react";

interface PasswordInputProps {
  className?: string;
  updatingKey: string;
  placeholder?: string;
  value?: string;
  setter?: (key: string, value: string) => void;
}

export const PasswordInput = observer(function PasswordInput({
  className,
  updatingKey,
  placeholder = "Mot de passe",
  value,
  setter,
}: PasswordInputProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <input
        className={className}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => setter && setter(updatingKey, e.target.value)}
        required
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="input-icon-btn"
      >
        {isVisible ? (
          <img alt="Masquer le mot de passe" src="assets/not-visible.png"></img>
        ) : (
          <img alt="Afficher le mot de passe" src="assets/visible.png"></img>
        )}
      </button>
    </div>
  );
});
