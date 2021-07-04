import React from "react";
import classes from "./PizzaItem.module.css";
import { Pizza } from "../../containers/PizzaPage/PizzaPage";
import { deleteFromPizzasArr } from "../../effector/store";
import { deletePizza } from "../../helpers/api";

async function onDelete(deleteId: string): Promise<void>{
    await deletePizza(deleteId);
    deleteFromPizzasArr(deleteId);
}

export const PizzaItem = ({ name, flavour, crust, size, id }: Pizza): React.ReactElement => {
    return (
        <li className={classes.PizzaItem} id={id}>
            <p>Pizza: { name }</p>
            <p>Flavour: { flavour }</p>
            <p>Crust: { crust }</p>
            <p>Size: { size }</p>

            <button onClick={() => {
                onDelete(id);
            }}>Delete</button>
        </li>
    );
};
