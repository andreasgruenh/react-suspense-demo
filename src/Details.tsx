import React from "react";
import { getPokemonDetails } from "./data/details";
import { useResource } from "./data/resource";
import { Image } from "./Image";

export function Details(props: {
  name: string;
  setSelectedName: (name: string | undefined) => void;
}) {
  const name = props.name;

  const detailsResource = useResource(name, name =>
    getPokemonDetails(name)
  );

  const details = detailsResource.data;

  return (
    <>
      <small style={{ fontWeight: "normal" }}>
        <a onClick={() => props.setSelectedName(undefined)}>
          Back
        </a>
      </small>
      <h1>Poke Details {name}</h1>

      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <Image
                  src={details.sprites.front_default}
                  alt={`Image of ${details.name}`}
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
    </>
  );
}
