document.getElementById('searchBar').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        loadPokemon(event.target.value.trim().toLowerCase());
    }
});

function loadPokemon(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayPokemon(data))
        .catch(error => console.error('Error fetching data: ', error));
}

function displayPokemon(pokemon) {
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
    document.getElementById('pokemonName').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const typeHTML = pokemon.types.map(type => 
        `<span class="type-${type.type.name.toLowerCase()}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`
    ).join(', ');
    console.log(typeHTML); // Debugging to see the output HTML string
    document.getElementById('pokemonTypes').innerHTML = typeHTML;
    
    const statsHtml = pokemon.stats.map(stat => {
        const percent = (stat.base_stat / 255) * 100;
        return `
            <div>
                <strong>${stat.stat.name}</strong>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="255">${stat.base_stat}</div>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('pokemonStats').innerHTML = statsHtml;

    const abilitiesHtml = pokemon.abilities.map(ability => `
        <div>${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</div>
    `).join('');
    document.getElementById('pokemonAbilities').innerHTML = abilitiesHtml;
}

document.getElementById('searchBar').addEventListener('click', function() {
    var pokeballIcon = document.getElementById('pokeballIcon');
    pokeballIcon.style.display = 'inline'; // Show the Pokeball
    pokeballIcon.classList.add('pokeball-spin'); // Start spinning animation
});

document.getElementById('searchBar').addEventListener('focus', function() {
    var pokeballIcon = document.getElementById('pokeballIcon');
    // Restart animation by removing and re-adding the class
    pokeballIcon.classList.remove('pokeball-spin'); // Force reflow/repaint
    void pokeballIcon.offsetWidth; // Trigger a reflow in between removal and re-addition of the class
    pokeballIcon.classList.add('pokeball-spin');
});

document.getElementById('button-addon2').addEventListener('click', function() {
    const pokemonName = document.getElementById('searchBar').value.trim().toLowerCase();
    if (pokemonName) {
        loadPokemon(pokemonName);
    }
});


// Load default Pokémon - Pikachu
loadPokemon('pikachu');

