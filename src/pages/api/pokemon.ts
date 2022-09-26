import { NextApiRequest, NextApiResponse } from "next";
const BASE_URL: string = "https://pokeapi.co/api/v2/pokemon-shape/";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { slug } = req.body;

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "please provide a slug" }));
    return;
  }
  try {
    const pokemon = await fetch(`${BASE_URL}${slug}`);
    const data = await pokemon.json();
    const r = data.pokemon_species;
    const hello = r.map((element: any) => {
      const k = element.name;
      return k;
    });
    console.log(hello);
    res.statusCode = 200;
      res.send(JSON.stringify(hello));
  } catch (error) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "error fetching pokemon" }));
  }
};
