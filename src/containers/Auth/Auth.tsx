import React from "react";
import classes from "./Auth.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useStore } from "effector-react";
import { setToken } from "../../effector/store";
import { authWithEmailandPassword } from "../../helpers/api";
import { createEvent, createStore } from "effector";
import { serverDataDecoder } from "../../helpers/decoder";
import * as t from "io-ts";

type User = {
    email: string
    password: string 
};

export const AuthRes = t.type({
    idToken: t.string,
    email: t.string,
    refreshToken: t.string,
    expiresIn: t.string,
    localId: t.string,
    registered: t.boolean
}, "AuthRes");


export const authData = createStore<Partial<User>>({});
export const setAuthData = createEvent <Partial<User>> ("change_user_name");
export const clearUserName = createEvent<void>("clear_user_name");

authData.on(setAuthData, (s, p) => p);
authData.reset(clearUserName);

export const Auth: React.FC = () => {

    const errMess = "Не верное имя пользовтеля или пароль";
    const userData = useStore(authData);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = userData.email as string;
        const password = userData.password as string;

        try {
            const res = await authWithEmailandPassword(email, password);
            const val = serverDataDecoder(AuthRes, res, errMess);
            localStorage.setItem("authToken", val.idToken);
            setToken(val.idToken);
            clearUserName();
        } catch (e) {
            alert("Не верное имя пользователя или пароль");
        }
    };

    return (
        <div className={classes.Auth}>
            <div>
                <h1>Авторизация</h1>
                <form onSubmit={submitHandler}>
                    <Input id="userName" label="User Name" value={userData.email ?? ""} onChange={v => setAuthData({ ...userData, email: v })} />
                    <Input id="userPass" label="User Password" value={userData.password ?? ""} onChange={v => setAuthData({ ...userData, password: v })} />
                    <Button type="success">Войти</Button>
                </form>
            </div>
        </div>
    );
};


