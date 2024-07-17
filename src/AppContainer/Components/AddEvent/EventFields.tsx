import { isGoogleMeetLink } from "Functions";
import { EventPostData } from "Interfaces";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface EventFieldsProps {
  newEvent: EventPostData;
  setter: (value: EventPostData) => void | null;
}

export const EventFields = observer(function EventFields({
  newEvent,
  setter,
}: EventFieldsProps): JSX.Element {
  const [linkError, setLinkError] = useState<string | null>(null);

  const updateNewEvent = (key: string, value: string) => {
    setter({ ...newEvent, [key]: value });
    if (key === "meeting_link") {
      if (!isGoogleMeetLink(value)) {
        setLinkError("Le lien doit être un lien Google Meet valide.");
      } else {
        setLinkError(null);
      }
    }
  };

  return (
    <div className="flex column gap-1">
      <select
        value={newEvent.event_type ?? ""}
        onChange={(e) => updateNewEvent("event_type", e.currentTarget.value)}
      >
        <option value="lesson">Conversation</option>
        <option value="simulation">Mise en situation</option>
      </select>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={newEvent.date ?? ""}
          onInput={(e) => updateNewEvent("date", e.currentTarget.value)}
          required
        />
      </div>
      <div className="flex gap-1">
        <div>
          <label>Heure début</label>
          <input
            type="time"
            value={newEvent.start ?? ""}
            onInput={(e) => updateNewEvent("start", e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>Heure fin</label>
          <input
            type="time"
            value={newEvent.end ?? ""}
            onInput={(e) => updateNewEvent("end", e.currentTarget.value)}
            required
          />
        </div>
      </div>
      <div>
        <label>Lien de la réunion</label>
        <input
          value={newEvent.meeting_link ?? ""}
          onInput={(e) => updateNewEvent("meeting_link", e.currentTarget.value)}
          required
        />
        {linkError && <p style={{ color: "red" }}>{linkError}</p>}
      </div>
    </div>
  );
});
