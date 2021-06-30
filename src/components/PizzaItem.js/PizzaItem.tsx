import React from "react";
import classes from "./PizzaItem.module.css";
import { deletePizza } from "../../helpers/api";
import { pizzaList, token } from "../../effector/store";
import { useStore } from "effector-react";
import { deleteItem, deleteFromPizzasArr } from "../../effector/event";
import { PizzaItemProps, PizzaListProps } from "../../helpers/interfaces";


export const PizzaItem = ({ name, flavour, crust, size, id }: PizzaItemProps): React.ReactElement => {

    const ListOfPizza = useStore(pizzaList) as PizzaListProps;
    const authToken = useStore(token);

    return (
        <li className={classes.PizzaItem} id={id.toString()}>
            <p>Pizza: { name }</p>
            <p>Flavour: { flavour }</p>
            <p>Crust: { crust }</p>
            <p>Size: { size }</p>

            <button onClick={async (e: React.MouseEvent) => {
                const target = e.target as HTMLElement;
                const parent = target.parentNode as HTMLElement;

                if (authToken) {
          
                    const id = parent.id;
                    let URLId = "";

                    for (const key in ListOfPizza) {
                        if (ListOfPizza[key].id === +id) {
                            URLId = key;
                        }
                    }
          
                    deleteItem(URLId);
                    deleteFromPizzasArr(id);

                    await deletePizza(URLId, authToken);
                } else {
                    alert("Авторизуйтесь для удаления данных");
                }

            }}>Delete</button>
        </li>
    );
};
