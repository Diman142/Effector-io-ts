import { createEvent } from "effector";
import { PizzaItemProps } from "../helpers/interfaces";
import { PizzaListProps } from "../helpers/interfaces";

export const changeUserName = createEvent < string > ("change_user_name");
export const clearUserName = createEvent<void>("clear_user_name");
export const changeUserPass = createEvent< string > ("change_user_password");
export const clearUserPassword = createEvent<void>("clear_user_password");

export const changePizzaName = createEvent< string > ("change_pizza_name");
export const clearPizzaName = createEvent<void>("clearPizzaName");
export const changePizzaFlavour = createEvent< string > ("change_pizza_flavour");
export const clearPizzaFlavour = createEvent<void>("clear_pizza_flavour");
export const changePizzaSize = createEvent< string > ("change_pizza_size");
export const clearPizzaSize = createEvent<void>("clear_pizza_size");
export const changePizzaCrust = createEvent< string > ("change_pizza_crust");
export const clearPizzaCrust = createEvent<void>("clear_pizza_crust");

export const getPizzas = createEvent<PizzaListProps>("get_pizzas");
export const addPizza = createEvent <PizzaListProps>("add_pizza");
export const deleteItem = createEvent < string > ("delete_pizza");

export const getPizzasArr = createEvent <PizzaItemProps[]>("get_pizzas_arr");
export const addToPizzasArr = createEvent <PizzaItemProps>("add_to_pizzas_arr");
export const deleteFromPizzasArr = createEvent < string > ("delete_from_pizzas_arr");

export const setToken = createEvent<string>("setToken");
export const clearToken = createEvent<void>("clearToken");