import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./pokemonDetail.css";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        setPokemon(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    loadPokemon();
  }, [name]);

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div className="pokemonDetail">
        {/* Boton de retroceso a la pokedex */}
        <button
            className="buttonBack"
            onClick={() => {
                window.history.back();
            }}
          >
            ← 
        </button>
        <h1>
            {pokemon.name}
        </h1>

        <img
            src={
            pokemon.sprites.other["official-artwork"]
                .front_default
            }
            alt={pokemon.name}
        />

        <div className="stats">
            {pokemon.stats.map((stat) => (
            <div
                key={stat.stat.name}
                className="stat"
            >
                <span>
                {stat.stat.name}
                </span>

                <div className="barContainer">
                <div
                    className="bar"
                    style={{
                    width: `${stat.base_stat}%`
                    }}
                ></div>
                </div>

                <span>
                {stat.base_stat}
                </span>
            </div>
            ))}
        </div>
    </div>
  );
}