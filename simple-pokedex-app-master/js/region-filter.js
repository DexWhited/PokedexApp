function regionIdToGenerationId(regionId) {
    // Map region IDs to corresponding generation IDs
    var regionIdMappings = {
        'K': 1,  // Example: 'K' maps to generation ID 1
        'J': 2,  
        'HO': 3, 
        'S': 4, 
        'U': 5, 
        'KA': 6, 
        'A': 7, 
        'G': 8, 
        'HI': 10, 
        'P': 9, 
        'KI': 11, 
    };

    return regionIdMappings[regionId];
}

function fetchAndDisplayPokemonByRegion(regionId) {
    // Use the regionId to construct the API URL for the corresponding generation
    var generationId = regionIdToGenerationId(regionId);
    if (!generationId) {
        console.error('Invalid region ID:', regionId);
        return;
    }

    var apiUrl = 'https://pokeapi.co/api/v2/generation/' + generationId;

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error fetching Pokémon data');
            }
            return response.json();
        })
        .then(function (data) {
            // Update the display
            updatePokemonList(data.pokemon_species);
        })
        .catch(function (error) {
            console.error('Error fetching Pokémon data:', error.message);
        });
}

function updatePokemonList(pokemonArray) {
    var pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = ''; // Clear existing list

    pokemonArray.forEach(function (pokemon) {
        var listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        pokemonList.appendChild(listItem);
    });
}





document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.grid-itemS2').forEach(function (item) {
        item.addEventListener('click', function () {
            // Fetch and display Pokémon of the respective region using the ID
            var regionId = item.id.split('grid-itemS2')[1];
            fetchAndDisplayPokemonByRegion(regionId);
        });
    });
});
