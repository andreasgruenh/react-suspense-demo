import { sleep } from "./sleep";

export async function getPokemonDetails(name: string) {
  await sleep(Math.random() * 500 + 500);
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  if (!resp.ok) {
    console.error(resp);
    throw new Error(resp.status + "");
  }

  const json = await resp.json();

  return json as PokemonDetails;
}

export type PokemonDetails = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  weight: number;
  order: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    is_hidden: boolean;
    slot: number;
  };
};
