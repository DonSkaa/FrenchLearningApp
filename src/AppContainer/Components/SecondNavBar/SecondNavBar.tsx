import "./SecondNavBar.css";
import { NavLink } from "react-router-dom";

export default function SecondNavBar({ menu }: {
    menu:
    {
        name: string;
        to: string;
    }[]
}): JSX.Element {
    return (
        <div className="second-main-navigation">
            {menu.map((menuItem, index) => (
                <NavLink key={index} to={menuItem.to} className="second-nav-btn display-flex align-center gap-1">
                    {menuItem.name}
                </NavLink>
            ))}
        </div>
    );
}

