import { NextApiRequest, NextApiResponse } from "next";
import getSprites from "../api/getSprites";
const BASE_URL: string = "https://pokeapi.co/api/v2/pokemon-shape/";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "please provide a slug" }));
    return;
  }
  try {
    const pokemon = await fetch(`${BASE_URL}${slug}`);
    const data = await pokemon.json();
    const r = data.pokemon_species;
    let h: string[] = [];
    let t: string[] = [];

    r.forEach(async (element: any) => {
        const k = element.name;
        const i = getSprites(k);
        h.push(k);
        t.push(await i);
    });
    res.statusCode = 200;
    res.send(JSON.stringify({ pokemon: h, image: t }));

  } catch (error) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "error fetching pokemon" }));
  }
};
