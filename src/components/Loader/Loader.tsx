import React from "react";
import classes from "./Loader.module.css";


export const Loader = (): React.ReactElement => {
    return (
        <div className={classes.Ring}>Loading
            <span></span>
        </div>
    );
};