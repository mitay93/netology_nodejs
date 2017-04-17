const pokemons = require('./first_generation'),
  PokemonList = require('./PokemonList'),
  Pokemon = require('./Pokemon'),
  Hidenseek = require("./hidenseek");

let method = process.argv[2],
  path = process.argv[3];

if (method === 'seek') {
  Hidenseek.seek(path)
    .then(
      foundedPokemons => {
        foundedPokemons.show();
      },
      error => {
        throw error
      }
    );
}

else if (method === 'hide') {
  let pokemons = require(process.argv[4]);
  let pokemonsObj = pokemons.map(data => new Pokemon(data.level, data.name));
  let pokemonList = new PokemonList(...pokemonsObj);
  Hidenseek.hide(path, pokemonList)
    .then(
      hiddenPokemons => {
        hiddenPokemons.show();
      },
      error => {
        throw error;
      }
    );
}

else {
  console.log(`seek <path> - найти покемонов в <path>
hide <path> <pokemonDataPath>(./first_generation.json) - спрятать покемонов из <pokemonDataPath> в <path>`);
}
