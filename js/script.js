
let pokemonRepository = (() => {

  // List out all pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // Get all pokemons in the list
  function getAll() {
    return pokemonList;
  }



  // Add new a pokemon
  function add(pokemon) {

    // Validate data type
    if (typeof (pokemon) === 'object') {
      pokemonList.push(pokemon);
    }
    else {
      console.log('Invalid input');
    }
  }




  // Add item to list
  function addListItem(pokemon, index) {

    // Create list elements
    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');


    // Display button with data from list
    button.innerText = `${index + 1}. ${pokemon.name}`;

    // Apply the styling
    listItem.classList.add('list-group');
    button.classList.add('list-group-item', 'list-group-item-light', 'list-group-item-action', 'col', 'col-sm-5', 'mx-auto', 'px-5', 'button');
    // button.setAttribute('id', 'show-modal');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    // Append the list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // Listen for 'Click' in order to trigger showDetails()
    button.addEventListener('click', () => showDetails(pokemon));

  }

  // Open modals
  function showModal(pokemon) {

    // Select parts of modals
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    // Clear existing data in modal
    modalTitle.innerText = '';
    modalBody.innerHTML = '';

    // Set Modal Title
    let elName = `<h1 class="modal-title px-4">${pokemon.name}</h1>`;

    // Set Modal Image
    let elImage = document.createElement('img');
    elImage.classList.add('modal-img', 'el-image', 'mx-auto', 'd-block');
    elImage.setAttribute('src', pokemon.imageUrl);

    // Set Height
    let elHeight = document.createElement('p');
    elHeight.classList.add('modal-text', 'px-4');
    elHeight.innerText = `Height: ${pokemon.height / 10} m`;

    // Set Types
    let elTypes = document.createElement('p');
    elTypes.classList.add('modal-text', 'px-4');
    elTypes.innerText = `Types: ${pokemon.types}`;

    // Assemble the Modal
    modalTitle.innerHTML = elName;
    modalBody.appendChild(elImage);
    modalBody.appendChild(elHeight);
    modalBody.appendChild(elTypes);

  }


  // showDetails()
  function showDetails(pokemon) {

    // load pokemon details
    loadDetails(pokemon)
      .then(() => {
        // show pokemon details in a modal
        showModal(pokemon);
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
      item.types = details.types.map(function (pokemon) {
        return pokemon.type.name;
      });

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
    loadDetails: loadDetails,
    showModal: showModal
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


