let pokemonRepository = (function() {
    //pokemon array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //function to add new pokemon to the pokemonList array via push (upend the existing array). Check that the input is an object.
    function add(pokemon) {
      pokemonList.push(pokemon);
    }


    //Add pokemon to the list with the format of a button
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let pokemonItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('name-button');
      button.addEventListener('click', Event => showDetails(pokemon));
      pokemonItem.appendChild(button);
      pokemonList.appendChild(pokemonItem);
    }

    //getAll function to return all of the items in the pokemonList array
    function getAll() {
      return pokemonList;
    }

    //loadList function gets the pokemon list from the pokeAPI
    function loadList() {
      return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        //forEach loop to get the name and detail URL from the pokeAPI response
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          //calls the add function to add the "items"/pokemon to the pokemonList array
          add(pokemon);
        });
        //if error log to the console
      }).catch(function(e) {
        console.error(e);
      })
    }

    //loads the details of the pokemon from the detailsUrl call
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
        //from the "url": "pokemon/1/ etc" endpoint from the pokeAPI list get the image, height, and types associated with each pokemon
      }).then(function(details) {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e) {
        console.log(e);
      });
    }
    //function to show a modal of the pokemon details (title, height/details to come, and the image)
    function showModal(title, text, img) {
      //clear the title and text of the modal 
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';

      //create new div with class = 'modal"
      let modal = document.createElement('div');
      modal.classList.add('modal');

      //create button element with class = "modal-close" with Close text and calls hideModal function to close upon click, esc, or click outside of modal
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      //H1 for the title in the modal
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
      //paragraph for the body of the modeal
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
      //image element for the pokemon image 
      let imageElement = document.createElement('img');
      imageElement.setAttribute("src", img);
      imageElement.setAttribute("alt", "Pokemon image");
      
      //create all of the modal elements defined above 
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      //make the modal visible on click
      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    }

    //hide modal function (by removing is-visible class)
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
          showModal(pokemon.name,pokemon.name + "'s height is: " + pokemon.height, pokemon.imageURL);
        });
      }

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
      };
    })();

  pokemonRepository.loadList().then(function() {
    //go to the pokemonRepository variable which should return the pokemon list via .gitAll*key is it's a funciton needs () and perform a forEach loop through each parameter of the pokemonRepo
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });