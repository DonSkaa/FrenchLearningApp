import FullScreenPopup from "AppContainer/Components/FullScreenPopup/FullScreenPopup";
import Skeleton from "AppContainer/Components/Skeleton/Skeleton";
import { EventContext } from "AppContainer/Context/EventContext";
import { UserContext } from "AppContainer/Context/UserContext";
import SignUp from "AppContainer/Profile/SignUp";
import AddEvent from "AppContainer/Components/AddEvent/AddEvent";
import { useContext, useEffect, useState } from "react";
import { User } from "FormatedDatabase";

export default function MyStudents(): JSX.Element {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [student, SetStudent] = useState<User>();
  const userContext = useContext(UserContext);

  const addStudent = () => {
    setShowSignUp(true);
  };

  const addEventPopUp = (currentStudent: User) => {
    SetStudent(currentStudent);
    setShowAddEvent(true);
  };

  return (
    <div className="full-width flex center m-4">
      <div className="main-section m-t-40">
        <div className="flex gap-1 m-b-10">
          <button className="strong-button" onClick={() => addStudent()}>
            Ajouter un élève
          </button>
        </div>
        {userContext?.currentStudents ? (
          userContext?.currentStudents.length ? (
            <div className="flex column gap-1">
              {userContext.currentStudents.map((student: any) => {
                return (
                  <div key={student.id} className="array-item">
                    <div className="strong">{student.name}</div>
                    <div>{student.program_id}</div>
                    <div>
                      <button
                        className="light-button"
                        onClick={() => addEventPopUp(student)}
                      >
                        Créer un évènement
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Il n'y a pas d'élèves pour le moment</div>
          )
        ) : (
          <Skeleton height={"65px"} />
        )}

        <FullScreenPopup show={showSignUp} onClose={() => setShowSignUp(false)}>
          <SignUp type="student" setterPopUp={setShowSignUp} />
        </FullScreenPopup>
        {student ? (
          <FullScreenPopup
            show={showAddEvent}
            onClose={() => setShowAddEvent(false)}
          >
            <AddEvent student={student} setterPopUp={setShowAddEvent} />
          </FullScreenPopup>
        ) : null}
      </div>
    </div>
  );
}
