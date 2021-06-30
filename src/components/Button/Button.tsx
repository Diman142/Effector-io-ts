import React from "react";
import classes from "./Button.module.css";

interface ButtonProp {
    onClick?: () => void
    disabled?: boolean
    children: React.ReactNode
    type: string
}

export const Button = (props: ButtonProp): React.ReactElement => {
    const cls = [
        classes.Button,
        classes[props.type]
    ];

    return (
        <button onClick={props.onClick}
                className={cls.join(" ")}
                disabled={props.disabled}>
            { props.children }
        </button>
    );
};

