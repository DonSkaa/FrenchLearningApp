import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar({ menu }: {
    menu:
    {
        name: string;
        to: string;
    }[]
}): JSX.Element {
    return (
        <div className="main-navigation">
            <h1>Learning French</h1>
            {menu.map((menuItem, index) => (
                <NavLink key={index} to={menuItem.to} className="navigation-button">
                    {menuItem.name}
                </NavLink>
            ))}
        </div>
    );
}

