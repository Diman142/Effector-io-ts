
import React from "react";
import { crust, flavour, size, pizzaname, pizzaList, pizzasArray, token } from "../../effector/store";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useStore } from "effector-react";
import { getPizzasArr, addToPizzasArr, deleteFromPizzasArr, changePizzaName, changePizzaFlavour, 
    changePizzaSize, changePizzaCrust, clearPizzaSize, clearPizzaCrust, clearPizzaFlavour, 
    clearPizzaName, getPizzas } from "../../effector/event";
import classes from "./PizzaPage.module.css";
import { getPizza, addPizza } from "../../helpers/api";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { PizzaItem } from "../../components/PizzaItem.js/PizzaItem";
import { deleteItem } from "../../effector/event";
import { PizzaItemProps, PizzaListProps } from "../../helpers/interfaces";


export const PizzaPage = (): React.ReactElement => {

    const [isLoaded, setIsLoaded] = useState(false);

    const pizzaNameValue = useStore(pizzaname);
    const flavourValue = useStore(flavour);
    const crustValue = useStore(crust);
    const sizeValue = useStore(size);
    const pizzaArr = useStore(pizzasArray) as PizzaItemProps[];
    const authToken = useStore(token);

    useEffect(() => {
        getPizza().then(result => {
            getPizzas(result as unknown as PizzaListProps);
            getPizzasArr(Object.values(result));
            
        }).then(() => {
            setIsLoaded(true);
        });
    }, []);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const obj = {
                id: Date.now(),
                crust: crustValue,
                name: pizzaNameValue,
                flavour: flavourValue,
                size: sizeValue
            };
            if (authToken) {
                addPizza(obj, authToken);
                addToPizzasArr(obj);
                clearPizzaName();
                clearPizzaFlavour();
                clearPizzaSize();
                clearPizzaCrust();
            } else {
                alert("Авторизуйтесь чтобы добавить данные");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler} className={classes.PizzaForm}>
                <h2>Add Pizza</h2>
                <Input id="userName" label="Pizza Name" value={pizzaNameValue} onChange={changePizzaName} />
                <Input id="userPass" label="Pizza Flavour" value={flavourValue} onChange={changePizzaFlavour} />
                <Input id="userName" label="Pizza Crust" value={crustValue} onChange={changePizzaCrust} />
                <Input id="userPass" label="Pizza size" value={sizeValue} onChange={changePizzaSize} />
                <Button type="success">Добавить пиццу</Button>
            </form>

            { isLoaded ?
                <ul className={classes.PizzaList}>
                    { pizzaArr.map((item: PizzaItemProps) => {
                        return (
                            <PizzaItem key={item.id} name={item.name} flavour={item.flavour} crust={item.crust} size={item.size} id={item.id} />
                        );
                    }) }
                </ul>
                :
                <Loader /> }

        </div>
    );
};

pizzaname
    .on(changePizzaName, (_state, payload) => payload)
    .reset(clearPizzaName);

flavour
    .on(changePizzaFlavour, (_state, payload) => payload)
    .reset(clearPizzaFlavour);
crust
    .on(changePizzaCrust, (_state, payload) => payload)
    .reset(clearPizzaSize);

size
    .on(changePizzaSize, (_state, payload) => payload)
    .reset(clearPizzaCrust);


pizzaList
    .on(getPizzas, (_state: PizzaListProps, payload: PizzaListProps) => {
        return { ...payload };
    })
    .on(deleteItem, (state: PizzaListProps, id: string) => {
        for (const key in state) {
            if (key === id) {
                delete state[key];
                break;
            }
        }
        return state;
    });


pizzasArray
    .on(getPizzasArr, (_state, payload: PizzaItemProps[]) => [...payload])
    .on(addToPizzasArr, (state: PizzaItemProps[], payload: PizzaItemProps) => {
        state.push(payload);
        return state;
    })
    .on(deleteFromPizzasArr, (state, id) => {
        return state.filter((item: PizzaItemProps) => {
            if (item.id !== +id) return true;
            return false;
        });
    });

