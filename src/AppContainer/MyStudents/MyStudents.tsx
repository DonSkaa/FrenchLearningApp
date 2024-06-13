import { AddEvent } from "AppContainer/Components/AddEvent/AddEvent";
import FullScreenPopup from "AppContainer/Components/FullScreenPopup/FullScreenPopup";
import LoadMore from "AppContainer/Components/LoadMore/LoadMore";
import Skeleton from "AppContainer/Components/Skeleton/Skeleton";
import { loadMoreStudents } from "AppContainer/Context/UserContext";
import { SignUp } from "AppContainer/Profile/SignUp";
import { CurrentUser } from "FormattedDatabase";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { store } from "store";

export const MyStudents = observer(() => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [student, SetStudent] = useState<CurrentUser>();

  const addStudent = () => {
    setShowSignUp(true);
  };

  const addEventPopUp = (currentStudent: CurrentUser) => {
    SetStudent(currentStudent);
    setShowAddEvent(true);
  };

  return (
    <div className="full-width flex center m-4  m-t-40">
      <div className="main-section">
        <div className="flex gap-1 m-b-10">
          <button className="strong-button" onClick={() => addStudent()}>
            Ajouter un élève
          </button>
        </div>
        {store.currentStudents ? (
          store.currentStudents.length ? (
            <div className="flex column gap-1">
              {store.currentStudents.map((student) => {
                return (
                  <div key={student.id} className="array-item">
                    <div className="strong">{student.name}</div>
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
              {store.hasMoreStudents ? (
                <LoadMore
                  onLoadMore={() => void loadMoreStudents()}
                  hasMore={store.hasMoreStudents}
                />
              ) : null}
            </div>
          ) : null
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
});
