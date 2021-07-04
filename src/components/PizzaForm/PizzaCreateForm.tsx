import React from "react";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import classes from "./PizzaCreateForm.module.css";
import { Button } from "components/Button/Button";
import { Input } from "../Input/Input";
import { addPizza, updatePizza } from "helpers/api";
import { Pizza } from "../../containers/PizzaPage/PizzaPage";
import * as t from "io-ts";
import { serverDataDecoder } from "../../helpers/decoder";
import { addToPizzasArr } from "../../effector/store";

export const AddRes = t.type({
    name: t.string,
}, "AuthRes");

export const pizzaCreateStore = createStore<Pizza>({
    id: "",
    name: "",
    flavour: "",
    size: "",
    crust: ""
});

export const setPizzaCreate = createEvent<Pizza>();
export const resetPizzaCreate = createEvent<void>();

pizzaCreateStore.on(setPizzaCreate, (s, p) => p);
pizzaCreateStore.reset(resetPizzaCreate);

export const PizzaCreateForm = (): React.ReactElement => {
    
    const authErrMess = "Авторизуйтесь для добавления новой пиццы";
    const value = useStore(pizzaCreateStore);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(value.name?.trim() && value.flavour?.trim() && value.crust?.trim() && value.size?.trim()) {
            const newPizza = {
                ...value,
            };
            const res = await addPizza(newPizza);
            const val = serverDataDecoder(AddRes, res, authErrMess);
            newPizza.id = val.name;
            await updatePizza(val.name, newPizza);
            addToPizzasArr(newPizza);
            resetPizzaCreate();
        } else {
            alert("Заполните все поля формы");
        }
    };

    return (
        <form onSubmit={submit} className={classes.PizzaForm}>
            <h2>Add Pizza</h2>
            <Input id="pizzaName" label="Pizza Name" value={value.name ?? ""} onChange={v => setPizzaCreate({ ...value, name: v as string })} />
            <Input id="pizzaFlavour" label="Pizza Flavour" value={value.flavour ?? ""} onChange={v => setPizzaCreate({ ...value, flavour: v as string })} />
            <Input id="pizzaCrust" label="Pizza Crust" value={value.crust ?? ""} onChange={v => setPizzaCreate({ ...value, crust: v as string })} />
            <Input id="pizzaSize" label="Pizza size" value={value.size ?? ""} onChange={v => setPizzaCreate({ ...value, size: v as string })} />
            <Button type="success">Добавить пиццу</Button>
        </form>
    );
};