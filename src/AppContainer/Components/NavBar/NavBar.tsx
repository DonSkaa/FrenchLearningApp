import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { SecondNavBar } from "../SecondNavBar/SecondNavBar";
import "./NavBar.css";

export const NavBar = observer(function NavBar({
  menu,
}: {
  menu: {
    name: string;
    to: string;
    icon: string;
  }[];
}): JSX.Element {
  return (
    <>
      <div className="main-navigation">
        <h1 className="title">Learning French</h1>
        {menu.map((menuItem, index) => (
          <NavLink
            key={index}
            to={menuItem.to}
            className="navigation-button display-flex align-center gap-1"
          >
            <img
              className="navigation-btn-img"
              src={menuItem.icon}
              alt="icon-item-menu"
            />
            <div className="menu-item ">{menuItem.name}</div>
          </NavLink>
        ))}
        <SecondNavBar
          menu={[
            { to: "/terms", name: "Conditions d'utilisation" },
            { to: "/privacy", name: "Confidentialité" },
          ]}
        />
      </div>
    </>
  );
});
