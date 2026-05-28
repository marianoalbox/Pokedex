import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPokemonsWithDetails } from "../api/api";
import "./pokemonList.css";

export default function PokemonList({ search, region, isShiny }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const regionRanges = {
  Kanto: [1, 151],
  Johto: [152, 251],
  Hoenn: [252, 386],
  Sinnoh: [387, 493],
  Teselia: [494, 649],
  Kalos: [650, 721],
  Alola: [722, 809],
  Galar: [810, 905],
  Paldea: [906, 1025],
  };

  const colors = {
    fire: "#f77214",
    water: "#5483f0",
    grass: "#68db2f",
    electric: "#faf600",
    ice: "#89e4e4",
    fighting: "#d81b11",
    poison: "#8a048a",
    ground: "#db8b13",
    flying: "#bea9fc",
    psychic: "#f33c73",
    bug: "#b8c920",
    rock: "#b8a038",
    ghost: "#6234ad",
    dragon: "#6a2ef8",
    dark: "#411261",
    steel: "#b8b8d0",
    fairy: "#ee99ac",
    normal: "#c0c0a3"
  };

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        setPokemons([]);
        const count = max - min + 1;
        const data = await getPokemonsWithDetails(
          count,
          min - 1
        );

        setPokemons(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  loadPokemons();

  }, [region]);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes((search || "").toLowerCase())
  );

  const [min, max] = regionRanges[region] || [1, 1026];


  if (loading) return <p>Cargando...</p>;

  return (
    
    <section>

      <div className="grid">
        <button
            className="backButton"
          >
            ← 
      </button>
        {filteredPokemons.map((pokemon) => {
          const type1 = pokemon.types[0].type.name;
          const type2 = pokemon.types[1]?.type.name;

          const background = type2
            ? `linear-gradient(135deg, ${colors[type1]}, ${colors[type2]})`
            : `${colors[type1]}`;

          return (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.name}`}
              className="card"
              style={{ background }}
            >
              <img
                src={
                  isShiny
                    ? pokemon.sprites.other["official-artwork"].front_shiny ||
                      pokemon.sprites.front_shiny
                    : pokemon.sprites.other["official-artwork"].front_default
                }
                alt={pokemon.name}
                style={{ height: "100px", width: "100px", marginTop: "5px" }}
              />
              <p>{pokemon.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}