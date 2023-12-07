document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.grid-item').forEach(function (item) {
        item.addEventListener('click', function () {
            // Toggle the visibility of the Pokemon list and details
            var typeId = item.id.split('-')[2]; 
            togglePokemonDetails(typeId);
        });
    });
});

function togglePokemonDetails(typeId) {
    var apiUrl = 'https://pokeapi.co/api/v2/type/' + typeId;

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error fetching Pokemon data');
            }
            return response.json();
        })
        .then(function (data) {
            // Toggle the visibility of the Pokemon list and details
            toggleListAndDetails(data.pokemon);
        })
        .catch(function (error) {
            console.error('Error fetching Pokemon data:', error.message);
        });
}

function toggleListAndDetails(pokemonArray) {
    var pokemonList = document.querySelector('.pokemon-list');
    var existingListItems = document.querySelectorAll('.pokemon-list-item');

    // Check if the list is already populated
    if (existingListItems.length === 0) {
        // If not, add each Pokemon to the list
        pokemonArray.forEach(function (pokemon) {
            var listItem = document.createElement('li');
            listItem.textContent = pokemon.pokemon.name;
            listItem.classList.add('pokemon-list-item');

            // Add click event to toggle the visibility of the details
            listItem.addEventListener('click', function () {
                toggleDetailsVisibility(listItem);
            });

            pokemonList.appendChild(listItem);
        });
    } else {
        // If the list is populated, clear it
        pokemonList.innerHTML = '';
    }
}

function toggleDetailsVisibility(listItem) {
    // Toggle the visibility of the details (image)
    var imageElement = listItem.querySelector('img');
    if (imageElement) {
        // If the image is present, remove it
        listItem.removeChild(imageElement);
    } else {
        var pokemonName = listItem.textContent;
        fetchPokemonDetails(pokemonName, listItem);
    }
}

function fetchPokemonDetails(pokemonName, listItem) {
    var detailsUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;

    fetch(detailsUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error fetching Pokemon details');
            }
            return response.json();
        })
        .then(function (details) {
            // Add the image to the list item
            var imageUrl = details.sprites.front_default;
            var imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            listItem.appendChild(imageElement);
        })
        .catch(function (error) {
            console.error('Error fetching Pokemon details:', error.message);
        });
}
