document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.grid-item').forEach(function (item) {
        item.addEventListener('click', function () {
            // Fetch and display Pokemon of the respective type using the ID
            var typeId = item.id.split('-')[2]; // Extract the type ID from the element ID
            fetchAndDisplayPokemonByType(typeId);
        });
    });
});

// Function to fetch and display Pokemon by type
function fetchAndDisplayPokemonByType(typeId) {
    // Use the typeId to construct the API URL
    var apiUrl = 'https://pokeapi.co/api/v2/type/' + typeId;


    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error fetching Pokemon data');
            }
            return response.json();
        })
        .then(function (data) {
            // update the display
            updatePokemonList(data.pokemon);
        })
        .catch(function (error) {
            console.error('Error fetching Pokemon data:', error.message);
        });
}

// Function to update the Pokemon list display
function updatePokemonList(pokemonArray) {
    
    var pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = ''; // Clear existing list

    // Add each Pokemon to the list
    pokemonArray.forEach(function (pokemon) {
        var listItem = document.createElement('li');
        listItem.textContent = pokemon.pokemon.name;
        pokemonList.appendChild(listItem);
    });
}
