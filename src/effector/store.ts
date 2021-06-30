import { createStore } from "effector";
import { PizzaItemProps, PizzaListProps } from "../helpers/interfaces";

export const userName = createStore<string>("");
export const userPassword = createStore<string>("");



export const crust = createStore<string>("");
export const flavour = createStore<string>("");
export const size = createStore<string>("");
export const pizzaname = createStore<string>("");

export const pizzaList = createStore<PizzaListProps>({});
export const pizzasArray = createStore<PizzaItemProps[]>([]);

export const token = createStore<string>("");
