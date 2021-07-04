import { createEvent, createStore } from "effector";
import { Pizza } from "../containers/PizzaPage/PizzaPage";

export const token = createStore<string>("");

export const setToken = createEvent<string>("setToken");
export const clearToken = createEvent<void>("clearToken");

token
    .on(setToken, (_state, payload) => payload);

export const pizzasList = createStore<Pizza[]>([]);

export const setPizzasArr = createEvent <Pizza[]>("get_pizzas_arr");
export const addToPizzasArr = createEvent<Pizza> ("add_to_pizzas_arr");
export const deleteFromPizzasArr = createEvent < string > ("delete_from_pizzas_arr");

pizzasList
    .on(setPizzasArr, (_s, p: Pizza[]): Pizza[] => [...p])
    .on(addToPizzasArr, (s, p: Pizza): Pizza[] => [...s, p])
    .on(deleteFromPizzasArr, (s, id): Pizza[] => s.filter((item: Pizza) => item.id !== id));

    
    