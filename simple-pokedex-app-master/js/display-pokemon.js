
document.addEventListener('DOMContentLoaded', function () {
    const pokemonName = 'bulbasaur';
  
    // Fetch Pokemon details
    fetchPokemonDetails(pokemonName)
      .then((details) => {
        // Display Pokemon details in the HTML
        displayPokemonDetails(details);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon details:', error.message);
      });
  
    function fetchPokemonDetails(pokemonName) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching Pokemon details');
          }
          return response.json();
        });
    }
  
    function displayPokemonDetails(details) {
      // Display Pokemon image
      const pokemonImg = document.querySelector('.item1b');
      pokemonImg.innerHTML = `<img src="${details.sprites.front_default}" alt="${details.name}">`;
  
      // Display Pokemon name
      const pokemonNameField = document.querySelector('.item2b');
      pokemonNameField.textContent = details.name;
  
      // Display Pokemon number
      const pokemonNumberField = document.querySelector('.item3b');
      pokemonNumberField.textContent = details.id;
  
      // Display Pokemon type
      const pokemonTypeField = document.querySelector('.item4b');
      pokemonTypeField.textContent = details.types[0].type.name;
  

        // Display Pokemon height
        const pokemonHeightField = document.querySelector('.item6b');
        pokemonHeightField.textContent = details.height;

        // Display Pokemon weight
        const pokemonWeightField = document.querySelector('.item7b');
        pokemonWeightField.textContent = details.weight;
        
     
    }
  });
  