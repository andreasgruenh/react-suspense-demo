import React from "react";
import { getFavoritePokemon } from "./data/favorites";
import { useResource } from "./data/resource";
import { theme } from "./theme";

export function List(props: {
  name: string | undefined;
  setSelectedName: (name: string | undefined) => void;
}) {
  const favoritesResource = useResource("favorites", () =>
    getFavoritePokemon()
  );

  const favorites = favoritesResource.data;

  return (
    <div className="list">
      <>
        <h1>Select Pokemon</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favorites.map(poke => (
            <li key={poke}>
              <a
                onClick={() => props.setSelectedName(poke)}
                style={{
                  display: "block",
                  padding: "0.5rem 1rem",
                  borderBottom: `1px solid ${theme.colors.turquoise}`,
                  cursor: "pointer"
                }}
              >
                {poke}{" "}
                {poke === props.name ? "Loading" : null}
              </a>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}
