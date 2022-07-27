const pokemonName = document.querySelector('span.pokemon_name')
const pokemonId = document.querySelector('span.pokemon_id');
const pokemonImage = document.querySelector('img.pokemon_image');

const form = document.querySelector('form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev')
const btnProx = document.querySelector('.btn-prox');

let searchPokemon = 1;

const getPokemon = async (pokemon) => {

  const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  // caso eu queria posso passar o .toLowerCase, Pode!
  if (pokeResponse.status === 200) {
    const data = await pokeResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  const valueInput = input.placeholder;
  const data = await getPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonImage.style.display = 'flex'
    pokemonImage.src = renderPokemonImage(data);

    searchPokemon = data.id;

    input.value = '';
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = '😥';
    pokemonId.innerHTML = '';
    input.value = ''
    input.placeholder = 'Não encontrado,tente novamente'
    setInterval(() => {
      input.placeholder = valueInput;
    }, 3000)
  }


  // Esse renderPokemonImage foi só pra brincar um pouca a mais com o cod(e não deixar as linhas ficar mt grande)
}

const renderPokemonImage = (pokemon) => {

  const data = pokemon;
  const value = data.sprites.versions['generation-v']['black-white'].animated.front_default;

  return value;

}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let value = input.value.toLowerCase();
  renderPokemon(value);

});

btnPrev.addEventListener('click', () => {
  if(searchPokemon > 1){
    searchPokemon--;
    renderPokemon(searchPokemon)
  }
});

btnProx.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon)
});


// Inicializando o primeiro pokemon

renderPokemon(searchPokemon)
