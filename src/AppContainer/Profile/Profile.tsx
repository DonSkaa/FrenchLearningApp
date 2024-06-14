import { Progression } from "AppContainer/Components/Progression/Progression";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { store } from "store";
import "./Profile.css";

export const Profile = observer(function Profile(): JSX.Element {
  return (
    <div className="container">
      {store.currentUser ? (
        <>
          <div className="quarter-width"></div>
          <div className="main-section">
            <div className="flex-center gap-1 m-b-10">
              <h2 className="left">{store.currentUser.name}</h2>
              <Link to="/settings">
                <img src="assets/settings.png" alt="" />
              </Link>
            </div>
            {store.currentUser.type === "student" ? <Progression /> : null}
          </div>
          <div className="quarter-width right"></div>
        </>
      ) : null}
    </div>
  );
});
