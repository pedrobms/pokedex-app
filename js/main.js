const poke_container = document.getElementById('poke_container');
const pokemon_number = 151;

const fetchPokemons = async () => {
  for(let i=1; i<= pokemon_number; i++){
    await getPokemon(i);
  }
}

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemonRes = await res.json();
  //console.log(pokemonRes);
  createPokemonCard(pokemonRes);  
}

const createPokemonCard = (pokemonData) => {
  const pokemonEl = document.createElement('div');
  const id = pokemonData.id;
  const name = pokemonData.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
  const sprites = {
    gen1: pokemonData.sprites.versions["generation-i"]["red-blue"].front_default,
    gen2: pokemonData.sprites.versions["generation-ii"]["crystal"].front_default,
    gen3: pokemonData.sprites.versions["generation-iii"]["emerald"].front_default,
    gen4: pokemonData.sprites.versions["generation-iv"]["platinum"].front_default,
    default: pokemonData.sprites.front_default,
  };
  const artwork = pokemonData.sprites.other["official-artwork"].front_default;
  const type = pokemonData.types.map(typeRes => {
    switch (typeRes.type.name){
      case 'grass':
        return 'Planta';
      case 'poison':
        return 'Veneno';
      case 'normal':
        return 'Normal';
      case 'fighting':
        return 'Lutador';
      case 'flying':
        return 'Voador';
      case 'ground':
        return 'Terra';
      case 'rock':
        return 'Rocha';
      case 'bug':
        return 'Inseto';
      case 'ghost':
        return 'Fantasma';
      case 'steel':
        return 'Aço';
      case 'fire':
        return 'Fogo';
      case 'water':
        return 'Água';
      case 'electric':
        return 'Elétrico'
      case 'psychic':
        return 'Psíquico'
      case 'ice':
        return 'Gelo';
      case 'dragon':
        return 'Dragão';
      case 'dark':
        return 'Sombrio';
      case 'Fairy':
        return 'Fada';
      case 'unknown':
        return 'Desconhecido';
      case 'shadow':
        return 'Shadow'
    }
  }).join(" / ");
  let stats = {hp: '', attack: '', defense: '', speed: '', specialAttack: '', specialDefense: ''};
  pokemonData.stats.map(statsRes => {
    switch(statsRes.stat.name){
      case 'hp':
        stats.hp = statsRes.base_stat;
        break;
      case 'attack':
        stats.attack = statsRes.base_stat;
        break;
      case 'defense':
        stats.defense = statsRes.base_stat;
        break
      case 'special-attack':
        stats.specialAttack = statsRes.base_stat;
        break;
      case 'special-defense':
        stats.specialDefense = statsRes.base_stat;
        break;
      case 'speed':
        stats.speed = statsRes.base_stat;
        break;
    }
  });
  console.log(pokemonData);
  pokemonEl.classList.add('col-lg-2');
  pokemonEl.classList.add('col-md-3');
  pokemonEl.classList.add('col-sm-4');
  pokemonEl.classList.add('col-6');
  pokemonEl.classList.add('card-group');
  pokemonEl.classList.add('mb-2');
  const pokemonCardHTML = `
  <div class="card">
    <span class="badge bg-secondary">${id}</span>
    <img src="${sprites.default}" class="img-fluid card-img-top">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="lead">${type}</p>
      <a href="#" data-bs-toggle="modal" data-bs-target="#modal${id}" class="stretched-link"></a>
    </div>
  </div>
  <div class="modal fade" id="modal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center" id="exampleModalLabel">${name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body container-fluid">
          <div class="row justify-content-center">
            <div class="col-8">            
              <img src="${artwork}" class="img-fluid artwork">
            </div>
            <div class="col-4">
              <div class="row">
                <small>Geração 1</small>
                <div class="col-12">
                  <img src="${sprites.gen1}" onerror="this.style.display='none'" alt="Sem Sprite" class="img-fluid">
                </div>
              </div>
              <div class="row">
                <small>Geração 2</small>
                <div class="col-12">
                  <img src="${sprites.gen2}" class="img-fluid">
                </div>
              </div>
              <div class="row">
                <small>Geração 3</small>
                <div class="col-12">
                  <img src="${sprites.gen3}" class="img-fluid">
                </div>
              </div>
              <div class="row">
                <small>Geração 4</small>
                <div class="col-12">
                  <img src="${sprites.gen4}" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
          <h4 class="text-center">Informações adicionais</h5>
          <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md-3">HP</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.hp}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.hp}
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-3">Ataque</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.attack}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.attack}
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-3">Defesa</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.defense}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.defense}
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-3">Atq. Especial</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.specialAttack}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.specialAttack}
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-3">Def. Especial</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.specialDefense}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.specialDefense}
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-3">Velocidade</div>
            <div class="col-12 col-md-9">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${stats.speed}%" aria-valuemin="0" aria-valuemax="100">
                  ${stats.speed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  
  pokemonEl.innerHTML = pokemonCardHTML;
  poke_container.appendChild(pokemonEl);
}

fetchPokemons();
