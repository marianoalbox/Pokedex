import "./pokedex.css";
import PokemonList from "../components/PokemonList";
import { useState } from "react";

export default function MainLayout() {
  const [search, setSearch] = useState("");

  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [isShiny, setIsShiny] = useState(false);
  const [selectedMode, setSelectedMode] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleStart = () => {
    setFadeOut(true);

    setTimeout(() => {
      setStarted(true);
    }, 800);
  };

  const regions = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Teselia",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea"
  ];

  return (
    <>
      <div className="background"></div>

      {/* Pantalla inicio */}
      {!started ? (
        <div className={`startScreen ${fadeOut ? "fadeOut" : ""}`}>
          <div className="startContent">
            <h1 className="title">POKÉDEX</h1>

            <button
              className="startButton"
              onClick={handleStart}
            >
              PRESS START
            </button>
          </div>
        </div>
      ) : !selectedMode ? (

        <div className="regionScreen fadeIn">
          {/* Eleccion de modo */}
          <h1 className="regionTitle">
            Selecciona modo
          </h1>
          <div className="regionGrid">
            <button
              className="regionCard"
              onClick={() => {
                setIsShiny(false);
                setSelectedMode(true);
              }}
            >
              Normal
            </button>

            <button
              className="regionCard shinyCard"
              onClick={() => {
                setIsShiny(true);
                setSelectedMode(true);
              }}
            >
              ✨ Shiny
            </button>
          </div>
        </div>

      ) : !selectedRegion ? (

        /* Menú regiones */
        <div className="regionScreen fadeIn">
          <button
            className="backButton"
            onClick={() => {
              setIsShiny(false);
              setSelectedMode(false)
              setSearch("");
            }}
          >
            ← 
          </button>
          <h1 className="regionTitle">
            Selecciona una
          </h1>
          <h1 className="regionTitle">
            región
          </h1>

          <div className="regionGrid">
            {regions.map((region) => (
              <button
                key={region}
                className="regionCard"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

      ) : (

        /* Pokédex */
        <div className="content fadeIn">
          <button
            className="backButton"
            onClick={() => {
              setSelectedRegion(null);
              setSearch("");
            }}
          >
            ← 
          </button>
          <h2 className="regionName">
            {selectedRegion}
          </h2>
          <div className="buscador">
            <input
              type="text"
              placeholder="Buscar Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="listaPokemones">
            <PokemonList
              key={selectedRegion}
              search={search}
              region={selectedRegion}
              isShiny={isShiny}
            />
          </div>
        </div>

      ) 
    }
    </>
  )
}