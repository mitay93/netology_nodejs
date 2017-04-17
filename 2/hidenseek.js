const PokemonList = require('./PokemonList');
const Pokemon = require('./Pokemon');
const fs = require('fs');
const file = 'pokemon.txt';
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const folders = 10;

function hide(path = './', pokemons) {
  return new Promise((resolve, reject) => {
    let countPokemons = pokemons.length > 3 ? randInt(1, 3) : randInt(1, pokemons.length),
      selectedPokemons = new PokemonList,
      hiddenPokemons = new PokemonList,
      hiddencountPokemons = countPokemons;
    randomize(pokemons);
    
    for (let i = 1; i <= countPokemons; i ++) {
      let id = randInt(0, pokemons.length);
      selectedPokemons.push(pokemons[id]);
    }
    
    function randomize(list) {
      return list.sort(function () {
        return 0.5 - Math.random()
      });
    }
    
    fs.access(path, fs.constants.W_OK, newFolders);
    
    function newFolders(error) {
      if (error) reject(error);
      for (let i = 1; i <= folders; i ++) {
        let folder = String(i).length < 2 ? `${path}/0${i}` : `${path}/${i}`;
        fs.mkdir(folder, (error) => {
          if (error) reject(error);
          newFile(folder);
        });
      }
    }
    
    function newFile(folder) {
      if (countPokemons > 0) {
        let pushing = selectedPokemons.shift();
        fs.writeFile(`${folder}/${file}`, pushing.info(), (error) => {
          if (error) reject(error);
          savePokemon(pushing);
        });
        countPokemons --;
      }
    }
    
    function savePokemon(pokemon) {
      hiddenPokemons.push(pokemon);
      if (hiddenPokemons.length === hiddencountPokemons)
        resolve(hiddenPokemons);
    }
  });
}

function seek(path = './') {
  return new Promise((resolve, reject) => {
    let foundedPokemons = new PokemonList(),
      readedFolders = 0,
      foldersCount;
    
    fs.readdir(path, searchFiles);
    
    function readFiles(error, data) {
      readedFolders ++;
      
      if (! error) {
        let pokemonData = data.split("|");
        foundedPokemons.add(pokemonData[0], pokemonData[1]);
        
        if (readedFolders === foldersCount)
          resolve(foundedPokemons);
      }
    }
    
    function searchFiles(error, folders) {
      if (error) reject(error);
      foldersCount = folders.length;
      
      folders.forEach(function (folder) {
        fs.readFile(`${path}${folder}/${file}`, 'utf8', readFiles);
      });
    }
  });
}
module.exports = {
  hide,
  seek
};
