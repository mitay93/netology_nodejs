const pokemons = require('./first_generation'),
  Pokemon = require('./Pokemon'),
  PokemonList = require('./PokemonList');
const objects = pokemons.map(
  obj => new Pokemon(obj.level, obj.name)
);
/**
 Создать два списка покемонов и сохранить их в переменных lost и found. Имена и уровни придумайте самостоятельно.
 **/
const lost = new PokemonList(...objects.filter(i => i % 2));
const found = new PokemonList(...objects.filter(i => ! (i % 2)));
/**
 Добавить несколько новых покемонов в каждый список.
 **/
lost.add(objects[15].level, objects[15].name);
found.add(objects[53].level, objects[53].name);

lost.show();
found.show();

found.push(lost.pop());

console.log("Покемон максимального уровня");
found.max().show(); //возвращает покемона максимального уровня.
