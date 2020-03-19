import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoritePokemon } from "./data/favorites";
import { theme } from "./theme";

export function List() {
  const [favorites, setFavorites] = useState<
    string[] | null
  >(null);

  useEffect(() => {
    getFavoritePokemon().then(setFavorites);
  }, []);

  return (
    <div className="list">
      {!favorites ? (
        "Loading"
      ) : (
        <>
          <h1>Select Pokemon</h1>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {favorites.map(poke => (
              <li key={poke}>
                <Link
                  to={`/${poke}`}
                  style={{
                    display: "block",
                    padding: "0.5rem 1rem",
                    borderBottom: `1px solid ${theme.colors.turquoise}`,
                    cursor: "pointer"
                  }}
                >
                  {poke}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
