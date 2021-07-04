import { Pizza } from "../containers/PizzaPage/PizzaPage";
import { serverDataDecoder } from "./decoder";
import * as t from "io-ts";

const url = "https://pizza-app-54e28-default-rtdb.europe-west1.firebasedatabase.app/pizza";
const apiKey = "AIzaSyD498-opN5jTxU_ZU8GTVf5svywwg0IKn4";
const authUtl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

const errMess = "Авторизуйтесь чтобы внести изменения";

export const addPizza = async (pizzaData: Partial<Pizza>): Promise<Response> => {
    const token = localStorage.getItem("authToken");
    serverDataDecoder(t.string, token, errMess);
    let res = await fetch(`${url}.json?auth=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(pizzaData)
    });

    res = await res.json();

    return res;
};

export const updatePizza = async(updateId: string, newPizza: Partial<Pizza>): Promise<void> => {
    const token = localStorage.getItem("authToken");
    await fetch(`${url}/${updateId}.json?auth=${token}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(newPizza)
    });
};

export const getPizza = async (): Promise<Response> => {
    let res = await fetch(`${url}.json`);
    res = await res.json();

    return res;
};

export const deletePizza = async (id: string): Promise<void> => {
    const token = localStorage.getItem("authToken");
    serverDataDecoder(t.string, token, errMess);
    await fetch(`${url}/${id}.json?auth=${token}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    });
};

export const authWithEmailandPassword = async (email: string, password: string): Promise<Response> => {
    let res = await fetch(authUtl, {
        method: "POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    res = await res.json();
    return res;
};