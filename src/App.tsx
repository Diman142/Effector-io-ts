import React from "react";
import "./App.css";
import { Auth } from "./containers/Auth/Auth";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./containers/Nav/Nav";
import { PizzaPage } from "./containers/PizzaPage/PizzaPage";

export function App(): React.ReactElement {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route path="/pizza" component={PizzaPage} />
                <Route path="/" component={Auth} />
            </Switch>
        </div>
    );
}


