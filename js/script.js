
// 
let pokemonRepository = (() => {

 // List out all pokemon
 let pokemonList = [
  {
   name: 'Bulbasaur',
   height: 0.7,
   types: [
    'grass',
    'poison'
   ]
  },
  {
   name: 'Squirtle',
   height: 0.5,
   types: [
    'water'
   ]
  },
  {
   name: 'Pikachu',
   height: 0.4,
   types: [
    'electric'
   ]
  },
  {
   name: 'Kangaskhan',
   height: 2.2,
   types: [
    'normal'
   ]
  }
 ];

 // Why is this not working?
 function addv(item) {
  if (typeof item !== Object) {
   // Stop program execution
   return;
  }
 }

 // Get all pokemons in the list
 function getAll() {
  return pokemonList;
 }

 // Add new a pokemon
 function add(item) {

  // Validate data type
  addv(item);
  // return the list with a newly added pokemon
  return pokemonList.push(item);
 }



 return {
  getAll: getAll,
  add: add
 };

})();



// pokemonList.forEach() 
pokemonRepository.getAll().forEach((pokemon, index) => {

 // pokemon with height > 1?
 pokemon.height > 1 ?
  // Display the list with label 
  document.write(`
   <li class="list mb-3">
    ${index + 1}. ${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!
   </li> 
`)
  :
  // Else, display just the list
  document.write(`
  <li class="list mb-3">
   ${index + 1}.  ${pokemon.name} (height: ${pokemon.height})
  </li> 
  `);
});




