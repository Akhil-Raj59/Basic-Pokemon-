import React from 'react';
import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';


function Pokedex(props) {
    return (
    <div className="flex flex-col justify-center items-center p-3 m-4 gap-4">
      
      <Search/>
      <PokemonList />
    </div>
    );
}

export default Pokedex;