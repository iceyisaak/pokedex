
let pokemonRepository = (() => {

  // List out all pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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
    button.classList.add('button', 'list');
    button.setAttribute('id', 'show-modal');

    // Append the list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // Listen for 'Click' in order to trigger showDetails()
    button.addEventListener('click', () => showDetails(pokemon));

  }



  let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    // Add Modal background
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add Modal Close Button
    let modalCloseBtn = document.createElement('button');
    modalCloseBtn.classList.add('modal-close');
    modalCloseBtn.innerText = 'X';
    modalCloseBtn.addEventListener('click', hideModal);

    // Add Modal Title
    let modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = `${pokemon.name}`;

    // Add Modal Text
    let modalText = document.createElement('p');
    modalText.classList.add('modal-text');
    modalText.innerText = `Height: ${pokemon.height / 10} m`;

    // Add Modal Image
    let modalImg = document.createElement('img');
    modalImg.classList.add('modal-image');
    modalImg.src = pokemon.imageUrl;

    // Assemble the modal parts
    modal.appendChild(modalCloseBtn);
    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modal.appendChild(modalImg);
    modalContainer.appendChild(modal);

    // Add class to show modal
    modalContainer.classList.add('is-visible');
  }




  // showDetails()
  function showDetails(pokemon) {

    // load pokemon details
    loadDetails(pokemon)
      .then(() => {
        // show pokemon details in a modal
        showModal(pokemon);
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

  // Hide Modal
  function hideModal() {
    // let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Hide Modal when Esc is pressed
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Hide Modal when clicking outside modal
  modalContainer.addEventListener('click', (e) => {

    if (e.target === modalContainer) {
      hideModal();
    }
  });


  // Return processed data for use
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
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


