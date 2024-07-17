import { addEvent } from "Functions";
import { CurrentUser, EventPostData } from "Interfaces";
import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { EventFields } from "./EventFields";

interface EventFieldsProps {
  student: CurrentUser;
  setterPopUp: (value: boolean) => void;
}

export const AddEvent = observer(function AddEvent({
  student,
  setterPopUp,
}: EventFieldsProps): JSX.Element {
  const [newEvent, setNewEvent] = useState<EventPostData>({} as EventPostData);

  useEffect(() => {
    if (student.teacher_id)
      setNewEvent({
        event_type: "lesson",
        date: "",
        start: "",
        end: "",
        user_id: student.id,
        teacher_id: student.teacher_id,
        meeting_link: "",
      });
  }, [student]);

  const sendNewEvent = async (
    newEvent: EventPostData,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await addEvent(newEvent);

    setterPopUp(false);
  };

  return (
    <div className="full-width flex center m-4">
      <form onSubmit={(e) => void sendNewEvent(newEvent, e)}>
        <EventFields newEvent={newEvent} setter={setNewEvent} />
        <button className="strong-button m-t-10">Valider</button>
      </form>
    </div>
  );
});
