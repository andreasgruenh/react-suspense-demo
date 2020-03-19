import { sleep } from "./sleep";

export async function getFavoritePokemon() {
  await sleep(Math.random() * 500 + 500);
  return ["togetic", "mew", "crobat"];
}
