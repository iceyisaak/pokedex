
let pokemonRepository = (() => {

  // List out all pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // Get all pokemons in the list
  function getAll() {
    return pokemonList;
  }


  // function add(pokemon) {
  //   if (typeof (pokemon) === 'object') {
  //     pokemonList.push(pokemon);
  //   }
  //   else { console.log('Invalid input'); }
  // }

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

    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');


    // Display button with data from list
    button.innerText = `${index + 1}. ${pokemon.name}`;

    // Apply the styling
    listItem.classList.add('group-list-item');
    button.classList.add('button', 'btn', 'btn-primary');
    // button.setAttribute('id', 'show-modal');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    // Append the list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // Listen for 'Click' in order to trigger showDetails()
    button.addEventListener('click', () => showDetails(pokemon));

  }



  // let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalHeader = document.querySelector('.modal-header');
    let modalBody = document.querySelector('.modal-body');


    modalTitle.innerText = '';
    modalBody.innerHTML = '';

    let elName = `<h1>${pokemon.name}</h1>`;

    let elImage = `<img class="modal-img" src="${pokemon.imageUrl}" style="width:50%"/>`;
    let elHeight = `<p>Height: ${pokemon.height}</p>`;
    let elTypes = `<p>Types: ${pokemon.types}</p>`;

    modalTitle.innerHTML = elName;
    modalBody.innerHTML = elImage;
    modalBody.innerHTML = elHeight;
    modalBody.innerHTML = elTypes;

    // // Clear all existing modal content
    // modalContainer.innerHTML = '';

    // // Add Modal Dialog
    // let modalDialog = document.createElement('div');
    // modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
    // modalDialog.setAttribute('role', 'document');

    // // Add Modal Content
    // let modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');

    // // Add Modal Header
    // let modalHeader = document.createElement('div');
    // modalHeader.classList.add('modal-header');

    // // Add Modal Title
    // let modalTitle = document.createElement('h1');
    // modalTitle.classList.add('modal-title');
    // modalTitle.setAttribute('id', 'modal-title');
    // modalTitle.innerText = `${pokemon.name}`;

    // // Add Modal Close Button
    // let modalCloseBtn = document.createElement('button');
    // modalCloseBtn.classList.add('close');
    // modalCloseBtn.setAttribute('type', 'button');
    // modalCloseBtn.setAttribute('data-dismiss', 'modal');
    // modalCloseBtn.setAttribute('aria-label', 'Close');

    // // Close Button Icon
    // let closeBtnIcon = document.createElement('span');
    // closeBtnIcon.setAttribute('aria-hidden', 'true');
    // closeBtnIcon.innerHTML = '&times;';

    // // Add Modal Body
    // let modalBody = document.createElement('div');
    // modalBody.classList.add('modal-body');

    // // Add Modal Text
    // let modalText = document.createElement('p');
    // modalText.classList.add('modal-text');
    // modalText.innerText = `Height: ${pokemon.height / 10} m`;

    // // Add Modal Image
    // let modalImg = document.createElement('img');
    // modalImg.classList.add('modal-image');
    // modalImg.src = pokemon.imageUrl;

    // // Add Modal Footer
    // let modalFooter = document.createElement('div');
    // modalFooter.classList.add('modal-footer');

    // // Assemble the modal parts
    // modalDialog.appendChild(modalContent);
    // modalContent.appendChild(modalHeader);

    // modalHeader.appendChild(modalTitle);
    // modalHeader.appendChild(modalCloseBtn);
    // modalCloseBtn.appendChild(closeBtnIcon);

    // modalContent.appendChild(modalBody);
    // modalBody.appendChild(modalImg);
    // modalBody.appendChild(modalText);

    // modalContent.appendChild(modalFooter);

    // modalContainer.appendChild(modalDialog);

    // // Add class to show modal
    // // modalContainer.classList.add('is-visible');
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
      item.types = details.types;

      // Log errors caught to console
    }).catch(function (e) {
      console.error(e);
    });
  }

  // // Hide Modal
  // function hideModal() {
  //   modalContainer.classList.remove('is-visible');
  // }

  // // Hide Modal when Esc is pressed
  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });

  // // Hide Modal when clicking outside modal
  // modalContainer.addEventListener('click', (e) => {

  //   if (e.target === modalContainer) {
  //     hideModal();
  //   }
  // });


  // Return processed data for use
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    // hideModal: hideModal
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


