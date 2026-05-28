import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
 
/* Obté la llista bàsica (name + url)*/
export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get("/pokemon", {
    params: { limit, offset },
  });

  return response.data.results;
};
 
/* Obté la informació completa de cada Pokémon*/
export const getPokemonsWithDetails = async (limit = 20, offset = 0) => {
  try {
    // 1. Llista base
    const basicList = await getPokemons(limit, offset);

    // 2. Crides en paral·lel
    const requests = basicList.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const responses = await Promise.all(requests);

    // 3. Retornar només les dades
    return responses.map((res) => res.data);
  } catch (error) {
    console.error("Error obtenint detalls dels Pokémon:", error);
    throw error;
  }
};