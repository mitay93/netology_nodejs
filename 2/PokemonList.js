/*Создать класс PokemonList, который в качестве аргументов принимает любое количество покемонов. Экземпляры этого класса должны обладать всеми функциями массива. А так же иметь метод add, который принимает в качестве аргументов имя и уровень, создает нового покемона и добавляет его в список.
 */
const Pokemon = require('./Pokemon');
class PokemonList extends Array {
  constructor(...pokemons) {
    pokemons = pokemons.filter(pokemon => pokemon instanceof Pokemon);
    super(...pokemons);
  }
  
  show() {
    console.log(`Список покемонов, всего ${this.length}`);
    for (let pokemon of this) {
      pokemon.show();
    }
  }
  
  add(level, name) {
    let newPokemon = new Pokemon(level, name);
    this.push(newPokemon);
  }
  
  //Добавить спискам покемонов метод max, который возвращает покемона максимального уровня.
  max() {
    let LevelMax = Math.max(...this);
    return this.find(item => item.valueOf() === LevelMax);
  }
}

module.exports = PokemonList;
