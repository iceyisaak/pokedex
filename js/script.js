
let pokemonRepository = (() => {

  // List out all pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // Testing Data Object
  // let pokemonList = [
  //   {
  //     name: 'Bulbasaur',
  //     height: 0.7,
  //     types: [
  //       'grass',
  //       'poison'
  //     ]
  //   },
  //   {
  //     name: 'Squirtle',
  //     height: 0.5,
  //     types: [
  //       'water'
  //     ]
  //   },
  //   {
  //     name: 'Pikachu',
  //     height: 0.4,
  //     types: [
  //       'electric'
  //     ]
  //   },
  //   {
  //     name: 'Kangaskhan',
  //     height: 2.2,
  //     types: [
  //       'normal'
  //     ]
  //   }
  // ];


  // Get all pokemons in the list
  function getAll() {
    return pokemonList;
  }


  function add(pokemon) {
    if (typeof (pokemon) === 'object') {
      pokemonList.push(pokemon);
    }
    else { console.log('Invalid input'); }
  }

  // Add new a pokemon
  function add(item) {

    // Validate data type
    if (typeof (item) === 'object') {
      pokemonList.push(item);
    }
    else {
      console.log('Invalid input');
    }
  }




  // Add item to list
  function addListItem(pokemon, index) {

    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');


    // Display button with data from list
    button.innerText = `${index + 1}. ${pokemon.name}`;

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

    // load pokemon details
    loadDetails(pokemon)
      .then(() => {
        //log the pokemon details
        console.log(pokemon);
      });
  }



  // load list of Pokemon
  function loadList() {

    // return fetched data from API as response
    return fetch(apiUrl).then(function (response) {

      // convert response into json()
      return response.json();

      // then bring json() data to use
    }).then(function (json) {

      // loop each through the fetched json results, as item
      json.results.forEach(function (item) {

        // Map variable to object, defining keys to value fetched 
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };

        // add pokemon data to list
        add(pokemon);
      });

      // catch any errors
    }).catch(function (e) {

      // show caught errors in the console
      console.error(e);
    });
  }


  // load details from fetched item
  function loadDetails(item) {

    // url is the item's detailsUrl
    let url = item.detailsUrl;

    // return the fetched url and its response
    return fetch(url).then(function (response) {

      // convert response to json()
      return response.json();

      // Then take in the details
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;

      // Log errors caught to console
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Return processed data for use
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();


// Fetch data from API
pokemonRepository.loadList().then(() => {

  // pokemonList.forEach() 
  pokemonRepository.getAll().forEach((pokemon, index) => {

    // Add item to list
    pokemonRepository.addListItem(pokemon, index);

  });
});




