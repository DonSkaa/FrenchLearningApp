import React from "react"
import "./NavBar.css"
import { NavLink } from "react-router-dom"

export default function NavBar({ menu }) {
    return (
        <div className="main-navigation">
            <h1>learning french</h1>
            {menu.map((menuItem, index) => (
                <NavLink key={index} to={menuItem.to} className="navigation-button">
                    {menuItem.name}
                </NavLink>
            ))}
        </div>
    )
}
