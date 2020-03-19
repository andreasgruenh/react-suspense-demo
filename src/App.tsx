import React from "react";
import { Route, Switch } from "react-router-dom";
import { Details } from "./Details";
import { List } from "./List";

export function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <List />
      </Route>
      <Route path="/:name">
        <Details />
      </Route>
    </Switch>
  );
}

// getFavoritePokemon().then(async pokemon => {
//   const details = await getPokemonDetails(pokemon[0]);
//   console.log(details.sprites.front_default);
// });
