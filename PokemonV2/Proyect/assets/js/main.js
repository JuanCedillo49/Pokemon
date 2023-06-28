// Obtener referencias a los elementos del formulario y de la interfaz
const form = document.getElementById('pokemonForm');
const searchInput = document.getElementById('searchInput');
const randomButton = document.getElementById('randomButton');
const pokemonInfoContainer = document.getElementById('pokemonInfoContainer');

// Manejar el evento de envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Realizar la búsqueda con el término ingresado (ID o nombre)
    searchPokemon(searchTerm);
  }
});

// Manejar el evento de clic del botón "Random ID"
randomButton.addEventListener('click', function() {
  const randomId = getRandomId();
  searchPokemon(randomId);
});

// Función para realizar la búsqueda del Pokémon
function searchPokemon(searchTerm) {
  // Construir la URL de la API basada en el término de búsqueda
  const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

  // Realizar la solicitud HTTP utilizando fetch
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Manipular los datos recibidos y mostrar la información relevante del Pokémon
      displayPokemonInfo(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Función para generar un ID aleatorio entre 1 y 150
function getRandomId() {
  return Math.floor(Math.random() * 150) + 1;
}

// Función para mostrar la información del Pokémon en la interfaz
function displayPokemonInfo(pokemonData) {
  // Crear elementos HTML dinámicamente para mostrar la ficha del Pokémon
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = pokemonData.name;

  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonImage.alt = pokemonData.name;

  const pokemonInfo = document.createElement('div');
  pokemonInfo.appendChild(pokemonName);
  pokemonInfo.appendChild(pokemonImage);

  // Actualizar el contenedor de información del Pokémon en la interfaz
  pokemonInfoContainer.innerHTML = ''; // Limpiar el contenido existente
  pokemonInfoContainer.appendChild(pokemonInfo);
}

function displayPokemonInfo(pokemonData) {
    const pokemonInfoContainer = document.getElementById('pokemonInfoContainer');
  
    // Crear la tarjeta (card) utilizando las clases de Bootstrap
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Contenido de la tarjeta (card)
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Nombre del Pokémon
    const pokemonName = document.createElement('h5');
    pokemonName.classList.add('card-title');
    pokemonName.textContent = pokemonData.name;
  
    // Imagen del Pokémon
    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('card-img-top');
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;
  
    // Tipo del Pokémon
    const pokemonTypes = document.createElement('p');
    pokemonTypes.classList.add('card-text');
    pokemonTypes.textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
  
    // Habilidades del Pokémon
    const pokemonAbilities = document.createElement('p');
    pokemonAbilities.classList.add('card-text');
    pokemonAbilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;
  
    // Estadísticas del Pokémon
    const pokemonStats = document.createElement('ul');
    pokemonStats.classList.add('list-group', 'list-group-flush');
    pokemonData.stats.forEach(stat => {
      const statItem = document.createElement('li');
      statItem.classList.add('list-group-item');
      statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      pokemonStats.appendChild(statItem);
    });
  
    // Peso del Pokémon
    const pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('card-text');
    pokemonWeight.textContent = `Weight: ${pokemonData.weight} kg`;
  
    // Altura del Pokémon
    const pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('card-text');
    pokemonHeight.textContent = `Height: ${pokemonData.height} cm`;
  
    // Agregar los elementos a la tarjeta (card)
    cardBody.appendChild(pokemonName);
    cardBody.appendChild(pokemonImage);
    cardBody.appendChild(pokemonTypes);
    cardBody.appendChild(pokemonAbilities);
    cardBody.appendChild(pokemonWeight);
    cardBody.appendChild(pokemonHeight);
  
    // Agregar el contenido de la tarjeta (card) al contenedor
    card.appendChild(cardBody);
    pokemonInfoContainer.innerHTML = ''; // Limpiar el contenido existente
    pokemonInfoContainer.appendChild(card);
    const moreInfoButton = document.createElement('button');
    moreInfoButton.classList.add('btn', 'btn-primary');
    moreInfoButton.textContent = 'More Info';
    moreInfoButton.addEventListener('click', function() {
      openModal(pokemonData);
    });
  
    // Agregar el botón a la tarjeta (card)
    cardBody.appendChild(moreInfoButton);
  }

  function openModal(pokemon) {
    // Obtener referencias a los elementos del modal
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
  
    // Actualizar los contenidos del modal con la información del Pokémon
    modalTitle.textContent = pokemon.name;
    modalBody.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="modal-image">
      <p><strong>Height:</strong> ${pokemon.height} decimetres</p>
      <p><strong>Weight:</strong> ${pokemon.weight} hectograms</p>
      <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <ul class="list-group list-group-flush">
        ${pokemon.stats
          .map(
            stat => `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`
          )
          .join('')}
      </ul>
    `;
  
    // Mostrar el modal
    $('#pokemonModal').modal('show');
  }
