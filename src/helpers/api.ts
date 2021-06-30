import { PizzaItemProps } from "../helpers/interfaces";

const url = "https://pizza-app-54e28-default-rtdb.europe-west1.firebasedatabase.app/pizza";

const apiKey = "AIzaSyD498-opN5jTxU_ZU8GTVf5svywwg0IKn4";
const authUtl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

export const addPizza = async (pizzaData: PizzaItemProps, token: string) => {
    let res = await fetch(`${url}.json?auth=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(pizzaData)
    });

    res = await res.json();

    console.log(res);
};

export const getPizza = async () => {
    let res = await fetch(`${url}.json`);
    res = await res.json();

    return res;
};

export const deletePizza = async (id: string, token: string) => {
    await fetch(`https://pizza-app-54e28-default-rtdb.europe-west1.firebasedatabase.app/pizza/${id}.json?auth=${token}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    });
};

export const authWithEmailandPassword = async (email: string, password: string) => {
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