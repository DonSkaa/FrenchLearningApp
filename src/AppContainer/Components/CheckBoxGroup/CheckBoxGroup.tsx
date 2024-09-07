import { observer } from "mobx-react-lite";

interface CheckBoxGroupProps {
  disabled: { accept_terms: boolean; is_old_enough: boolean };
  setter: (key: string, value: boolean) => void;
}

export const CheckBoxGroup = observer(function CheckBoxGroup({
  disabled,
  setter,
}: CheckBoxGroupProps): JSX.Element {
  ({});

  return (
    <>
      <div className="flex start gap-1 align-center">
        <input
          type="checkbox"
          checked={disabled.is_old_enough}
          onChange={(e) => setter("is_old_enough", e.target.checked)}
          required
        />
        <label>J'ai 18 ans ou plus</label>
      </div>

      <div className="flex start gap-1 align-center">
        <input
          type="checkbox"
          checked={disabled.accept_terms}
          onChange={(e) => setter("accept_terms", e.target.checked)}
          required
        />
        <label>J'accepte les conditions générales</label>
      </div>
    </>
  );
});
