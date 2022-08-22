const BASE_URL :string = 'https://pokeapi.co/api/v2/pokemon/'
export default async (name:string) => {
    try {
        const sprite = await fetch(
            `${BASE_URL}${name}`
        );
        // if response returns a 404, return null
        if (sprite.status === 404) {
            return null;
        }
        const data = await sprite.json();
        // console.log(data.sprites.front_default);
        return( data.sprites.front_default);
    } catch (error) {
        console.log(error);
    }
    
}

