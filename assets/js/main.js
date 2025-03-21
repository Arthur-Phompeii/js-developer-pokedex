
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 1000
const limit = 100
let offset = 0;

function loadPokemonItems(offset, limit) {
//consumo API
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {       
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" draggable="false" id="${pokemon.id}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>
                    
                    <div class="image">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="Bg">
                    <img src="./assets/images/pokeball_vetor.png">
                </div>
            </li>
            `).join(' ');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit);
    }
})