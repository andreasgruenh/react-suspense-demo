import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  getPokemonDetails,
  PokemonDetails
} from "./data/details";

export function Details() {
  const name = useRouteMatch<{ name: string }>().params
    .name;

  const [
    details,
    setDetails
  ] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    getPokemonDetails(name).then(setDetails);
  }, [name]);

  return (
    <>
      <small style={{ fontWeight: "normal" }}>
        <Link to="/">Back</Link>
      </small>
      <h1>Poke Details {name}</h1>
      {!details ? (
        "Loading"
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <img
                    src={details.sprites.front_default}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{details.name}</td>
              </tr>
              <tr>
                <td>Types</td>
                <td>
                  <ul>
                    {details.types.map((type, index) => (
                      <li key={index}>{type.type.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td>
                  <ul>
                    {details.abilities.map(
                      (ability, index) => (
                        <li key={index}>
                          {ability.ability.name}
                        </li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
