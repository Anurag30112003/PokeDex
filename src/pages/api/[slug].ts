import { NextApiRequest, NextApiResponse } from "next";
const BASE_URL:string = "https://pokeapi.co/api/v2/pokemon-shape/";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "please provide a slug" }));
    return;
  }
  try {
    const pokemon = await fetch(
      `${BASE_URL}${slug}`
    );
    const data = await pokemon.json();
    const r = data.pokemon_species;
    let h:string[] = [];
    r.forEach((element: any) => {
      const k = element.name;
      h.push(k);
    });
    res.statusCode = 200;
    res.send(JSON.stringify(h));
    return;
  } catch (error) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "error fetching pokemon" }));
  }
};
