// Task 1.2
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

// Task 1.3


// Looping through the pokemonList
for (i = 0; i < pokemonList.length; i++) {

 // pokemon with height > 1?
 pokemonList[i].height > 1 ?

  // Display the list with label next to the list
  document.write(`
  <li class="list mb-3">
  ${i + 1}. ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!
  </li> 
  `)
  :
  // Else, just display the list
  document.write(`
 <li class="list mb-3">
 ${i + 1}.  ${pokemonList[i].name} (height: ${pokemonList[i].height})
 </li> 
 `);
}


