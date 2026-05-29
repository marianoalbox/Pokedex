import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./pokemonDetail.css";

// Colores de tipo oficiales
const typeColors = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
  poison: '#A040A0',
};

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

  // Degradado de fondo basado en los tipos
  const pokemonTypes = pokemon.types.map((type) => type.type.name);
  const color1 = typeColors[pokemonTypes[0]] || '#333';
  const color2 = pokemonTypes[1] ? typeColors[pokemonTypes[1]] : color1;
  
  // Caso especial para el tipo 'fire' para imitar degradado naranja-amarillo
  let gradientString = '';
  if (pokemonTypes.length === 1 && pokemonTypes[0] === 'fire') {
    gradientString = `linear-gradient(to bottom right, #F08030, #F8D030)`;
  } else {
    gradientString = `linear-gradient(to bottom right, ${color1}, ${color2})`;
  }

  return (
    <div 
      className="pokemonDetail"
      style={{ backgroundImage: gradientString }}
    >
        {/* Botón de retroceso */}
        <button
            className="buttonBack"
            onClick={() => {
                window.history.back();
            }}
          >
            ← 
        </button>

        <h1>{pokemon.name}</h1>

        {/* Imagen principal del Pokémon */}
        <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
        />

        <div className="contenedor">
          {pokemonTypes.map(typeName => (
            <div 
              key={typeName} 
              className="elementos"
              style={{ backgroundColor: typeColors[typeName] }}
            >
              <img 
                src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg`} 
                alt={typeName} 
              />
            </div>
          ))}
        </div>

        {/* Tabla de estadísticas */}
        <div className="stats">
            {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat">
                <span>{stat.stat.name}</span>
                <div className="barra">
                  <div
                      className="bar"
                      style={{ width: `${stat.base_stat}%` }}
                  ></div>
                </div>
                <span>{stat.base_stat}</span>
            </div>
            ))}
        </div>
    </div>
  );
}