import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

export const Nav = (): React.ReactElement => {

    return (
        <nav className={classes.Nav}>
            <ul>
                <li>
                    <NavLink to="/">Авторизация</NavLink>
                </li>
                <li>
                    <NavLink to="/pizza">Страница с пиццей</NavLink>
                </li>
            </ul>
        </nav>
    );
};