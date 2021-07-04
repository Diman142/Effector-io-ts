import React from "react";
import classes from "./Input.module.css";

interface InputProps {
    id: string
    label: string
    type?: string
    value: string 
    onChange: (value?: string) => void
}

export const Input = ({ id, label, type = "text", value, onChange }: InputProps): React.ReactElement => {
    return (
        <div className={classes.Input}>
            <label htmlFor={id}>
                { label }
                <input id={id}
                       type={type}
                       value={value}
                       onChange={(e: React.FormEvent<HTMLInputElement>) => { 
                           const target = e.target as HTMLInputElement;
                           onChange(target.value); 
                       }}>
                </input>
            </label>
        </div>
    );
};