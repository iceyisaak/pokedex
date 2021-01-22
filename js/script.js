
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
    // If item is NOT object
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

    // Validate data type (NOT WORKING)
    addv(item);
    // return the list with a newly added pokemon
    return pokemonList.push(item);
  }

  // Add item to list
  function addListItem(pokemon, index) {

    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    // Apply the styling
    button.classList.add('button', 'list', 'mb-3');


    // Append the list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // Listen for 'Click' in order to trigger showDetails()
    button.addEventListener('click', () => showDetails(pokemon));

  }

  // showDetails()
  function showDetails(pokemon) {

    //log the pokemon clicked
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };

})();


// pokemonList.forEach() 
pokemonRepository.getAll().forEach((pokemon, index) => {

  // Add item to list
  pokemonRepository.addListItem(pokemon, index);

});




