import React from 'react';
import { useEffect,useState} from 'react'
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';



function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [nextUrl,setNextUrl] = useState("")
    const [prevUrl,setPrevUrl] = useState("")

    const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

    async function downloadPokemons(){

        const response = await axios.get(pokedexUrl); // download list of 20 pokemons

        const pokemonResults = response.data.results // we get the array of pokemons from results

        console.log(response.data);
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        // iterating over the array of pokemons,and using their url, to create an array of promises that will download those 20 pokemons 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemon detailed data

        // now iterating on the data of each pokemon,extract id,name,image,types
        const pokeListResult = (pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon .sprites.other.dream_world.front_default, 
                types: pokemon.types}
        }))
        console.log(pokeListResult);
        setPokemonList(pokeListResult)
        setIsLoading(false)
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedexUrl])
    return (
        <div className='m-4'>
           <div className='flex flex-wrap m-0 justify-evenly'>
                {(isLoading) ? "Loading..." : 
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)   
                }
           </div>
           <div className='flex justify-center'>
                <button disabled={prevUrl == undefined} onClick={()=> setPokedexUrl(prevUrl)} className='px-4 py-2 ml-4 border-blue-500 border-2'>Prev</button>
                <button disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)} className='px-4 py-2 ml-4 border-blue-500 border-2'>Next</button>
           </div>
        </div>
    );
}

export default PokemonList;