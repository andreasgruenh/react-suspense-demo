import React, {
  Suspense,
  useState,
  useTransition
} from "react";
import {
  unstable_scheduleCallback,
  unstable_UserBlockingPriority
} from "scheduler";
import { Details } from "./Details";
import { List } from "./List";

export function App() {
  const [nameToFetch, setNameToFetch] = useState<
    string | undefined
  >(undefined);
  const [fetchedName, setFetchedName] = useState<
    string | undefined
  >(undefined);

  const [startTransition] = useTransition({
    timeoutMs: 5000
  });

  return !fetchedName ? (
    <Suspense fallback={<h1>Loading!</h1>}>
      <List
        name={nameToFetch}
        setSelectedName={name => {
          setTimeout(() => {
            unstable_scheduleCallback(
              unstable_UserBlockingPriority,
              () => {
                setNameToFetch(name);
              }
            );
          }, 250);

          startTransition(() => {
            setFetchedName(name);
          });
        }}
      />
    </Suspense>
  ) : (
    <Suspense fallback={<h1>Loading</h1>}>
      <Details
        name={fetchedName}
        setSelectedName={name => {
          setNameToFetch(name);

          startTransition(() => {
            setFetchedName(name);
          });
        }}
      />
    </Suspense>
  );
}

// getFavoritePokemon().then(async pokemon => {
//   const details = await getPokemonDetails(pokemon[0]);
//   console.log(details.sprites.front_default);
// });
