import React from "react";
import classes from "./Auth.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { userName, userPassword, token } from "../../effector/store";
import { useStore } from "effector-react";
import { changeUserName, changeUserPass, clearUserName, clearUserPassword, setToken } from "../../effector/event";
import { authWithEmailandPassword } from "../../helpers/api";
import { AuthRes } from "../../helpers/userTypes";
import { Type } from "io-ts";

export function authDecoder<A, O>(t: Type<A, O>, o: unknown): A {
    const decoded = t.decode(o);
    if (decoded._tag === "Right") return decoded.right;
    throw new Error("Failed to decode object of type");
}


export const Auth: React.FC = () => {

    const userNameValue = useStore(userName);
    const userPassValue = useStore(userPassword);

    const submitHandler = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const email = userNameValue;
        const password = userPassValue;

        try {
            const res = await authWithEmailandPassword(email, password);
            const val = authDecoder(AuthRes, res);
            const token = val.idToken;
            setToken(token);
            clearUserName();
            clearUserPassword();
        } catch (e) {
            alert("Не верное имя пользователя или пароль");
        }

    };

    return (
        <div className={classes.Auth}>
            <div>
                <h1>Авторизация</h1>

                <form onSubmit={submitHandler}>
                    <Input id="userName" label="User Name" value={userNameValue} onChange={changeUserName} />
                    <Input id="userPass" label="User Password" value={userPassValue} onChange={changeUserPass} />
                    <Button type="success">Войти</Button>
                </form>
            </div>
        </div>
    );
};


userName
    .on(changeUserName, (state, payload) => payload)
    .reset(clearUserName);

userPassword
    .on(changeUserPass, (_state, payload) => payload)
    .reset(clearUserPassword);

token
    .on(setToken, (state, payload) => payload);