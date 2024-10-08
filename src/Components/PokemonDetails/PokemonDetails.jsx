import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const [pokemon, setPokemon] = useState({});
    const { id } = useParams();

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
        });
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-11/12 md:w-2/3 lg:w-1/2">
                <h1 className="text-3xl font-bold text-orange-500 mb-4 capitalize">
                    {pokemon.name}
                </h1>
                {pokemon.image && (
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-40 h-40 object-contain mx-auto mb-6"
                    />
                )}
                <div className="text-lg space-y-2">
                    <p className="text-gray-300">
                        <span className="font-semibold text-orange-400">Weight:</span> {pokemon.weight} kg
                    </p>
                    <p className="text-gray-300">
                        <span className="font-semibold text-orange-400">Height:</span> {pokemon.height} m
                    </p>
                </div>
                <div className="mt-4 flex flex-wrap justify-center space-x-2">
                    {pokemon.types && pokemon.types.map((t) => (
                        <span
                            key={t}
                            className="bg-orange-600 px-4 py-2 rounded-full text-sm text-gray-900 shadow-md"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;
