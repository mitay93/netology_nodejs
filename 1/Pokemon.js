/*Создать класс Pokemon, конструктор которого принимает имя и уровень в качестве аргумента. Все экземпляры этого класса должны иметь общий метод show, который выводит информацию о покемоне.
 */
class Pokemon {
  constructor(level, name) {
    this.level = level;
    this.name = name;
  }
  
  show() {
    console.log(`${this.name}, ${this.level}`);
  }
  
  //Переопределите и используйте метод valueOf у покемонов, для решения этой задачи.
  valueOf() {
    return this.level;
  }
}

module.exports = Pokemon;
