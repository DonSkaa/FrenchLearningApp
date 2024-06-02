import { calculateProgress } from "Functions";
import { useEffect, useState } from "react";
import { store } from "store";

export default const Progression = observer(function Progression(): JSX.Element {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (store.currentUserProgram) {
      const currentUserProgram = store.currentUserProgram; // Update the type of currentUserProgram
      setProgress(
        calculateProgress(
          currentUserProgram.start_date,
          currentUserProgram.end_date
        )
      );
    }
  }, [store.currentUserProgram]);

  return (
    <div>
      {store.currentUserProgram && progress ? (
        <div className="flex column gap-1">
          <div className="progression-cursor">
            <h3 className="m-0 left">Progression programme</h3>
            <div className="flex-center gap-1">
              <div className="cursor-container">
                <div className="cursor" style={{ width: `${progress}%` }}></div>
              </div>
              <div>{progress}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Pas de programme en cours</div>
      )}
    </div>
  );
})
