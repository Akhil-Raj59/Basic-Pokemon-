import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    async function downloadPokemons() {
        const response = await axios.get(pokedexUrl); // download list of 20 pokemons
        const pokemonResults = response.data.results; // get array of pokemons from results

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data

        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            };
        });
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="m-4">
                <div className="flex flex-wrap justify-evenly gap-4">
                    {isLoading ? (
                        <p className="text-orange-400 text-xl">Loading...</p>
                    ) : (
                        pokemonList.map((p) => (
                            <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />
                        ))
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        disabled={!prevUrl}
                        onClick={() => setPokedexUrl(prevUrl)}
                        className={`px-4 py-2 mx-2 rounded-md border-2 
                            ${
                                prevUrl
                                    ? 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-gray-900'
                                    : 'border-gray-500 text-gray-500 cursor-not-allowed'
                            } transition-colors duration-300`}
                    >
                        Prev
                    </button>
                    <button
                        disabled={!nextUrl}
                        onClick={() => setPokedexUrl(nextUrl)}
                        className={`px-4 py-2 mx-2 rounded-md border-2 
                            ${
                                nextUrl
                                    ? 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-gray-900'
                                    : 'border-gray-500 text-gray-500 cursor-not-allowed'
                            } transition-colors duration-300`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PokemonList;
