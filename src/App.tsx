import React from "react";
import "./App.css";
import { Auth } from "./containers/Auth/Auth";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./containers/Nav/Nav";
import { PizzaPage } from "./containers/PizzaPage/PizzaPage";
import { Button } from "components/Button/Button";

export function App(): React.ReactElement {

    //const isAuth = useState(false);

    return (
        <div className="App">
            <Nav />
            <Button type="primary">Выйти</Button>
            <Switch>
                <Route path="/pizza" component={PizzaPage} />
                <Route path="/" component={Auth} />
            </Switch>
        </div>
    );
}


