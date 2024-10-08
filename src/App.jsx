import Pokedex from "./Components/Pokedex/Pokedex"
import PokemonList from "./Components/PokemonList/PokemonList"
import Search from "./Components/Search/Search"


function App() {

  return (
    <div className="flex flex-col justify-center items-center p-3 m-4 gap-4">
      <h1 className="text-3xl font-semibold">Pokedex</h1>
      <Search/>
      <PokemonList />
    </div>
  )
}

export default App
