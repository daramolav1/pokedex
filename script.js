const pokeContainer = document.getElementById("poke-container");
const pokeCount = 150;
const colors = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5",
};

const mainTypes = Object.keys(colors);

const fetchPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};
const createPokemonCard = (pokemon) => {
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("pokemon");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const pokeType = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeType.indexOf(type) > -1);
  const color = colors[type];

  pokeEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
  <div class="img-container">
    <img 
        src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" 
        alt="" 
    />
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  pokeEl.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(pokeEl);
};

fetchPokemon();
