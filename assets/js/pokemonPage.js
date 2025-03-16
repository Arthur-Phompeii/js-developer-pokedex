pokeApiId = {};
const mainElement = document.querySelector('main');

function adicionarEscutas(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const pokeCard = document.querySelectorAll('.pokemon');
            pokeCard.forEach(poke => {
                poke.addEventListener('click', function() {
                    console.log(`Você escolheu o pokemon ${this.id}`);
                    const ID = this.id
                    loadPokePage(ID);
                }); 
            });
            /* const pokeCard = Array.from(document.getElementsByClassName('pokemon'));console.log(pokeCard);
            for (let i = 0; i < pokeCard.length; i++) {
                pokeCard[i].addEventListener('click', () => {
                console.log(`você escolheu um pokemon ${pokeCard[i]}`);
                console.log(pokeCard[i].id);
                });   
            }; */
        };
        /* observer.disconnect(); */
    };
};

const observer = new MutationObserver(adicionarEscutas);

const config = {
    childList: true,
    subtree: true
};

const targetNode = document.getElementById('pokemonList');

observer.observe(targetNode, config);

//Montando as informações desse pokemon específico

function convertPokeApiSpecificToPokemon(pokeSpec) {
    const pokeId = new PokePage()
    pokeId.number = formatNumber(pokeSpec.id)
    pokeId.id = pokeSpec.id
    pokeId.name = pokeSpec.name

    const types = pokeSpec.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokeId.types = types
    pokeId.type = type

    pokeId.photo = pokeSpec.sprites.other.home.front_default

    pokeId.abilities = pokeSpec.abilities.map((abilitySlot) => [abilitySlot.ability.name, abilitySlot.is_hidden, abilitySlot.slot, abilitySlot.ability.url]) 
    
    pokeId.baseExp = pokeSpec.base_experience;
    pokeId.cry = pokeSpec.cries.latest
    
    const forms = pokeSpec.forms.map((formSlot) => formSlot.name)
    const [form] = forms
    
    pokeId.forms = forms
    pokeId.form = form

    pokeId.height = pokeSpec.height
    pokeId.weight = pokeSpec.weight
    
    pokeId.heldItems = pokeSpec.held_items.map((itemsSlot) => itemsSlot.item.name)
    pokeId.sprites = [pokeSpec.sprites.other.home.front_default, pokeSpec.sprites.other.home.front_female, pokeSpec.sprites.other.home.front_shiny, pokeSpec.sprites.other.home.front_shiny_female] 
    
    pokeId.stats = pokeSpec.stats.map((statsSlot) => [statsSlot.stat.name, statsSlot.base_stat])

    return pokeId
}

function convertAbilitySpecificToShotAbility(ability) {
    const shortAbility = new Ability()
    ability.shortEffect = ability.effect_entries[0].short_effect

    return shortAbility;
}

async function urlRequest(pokeId) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

    return fetch(URL)
    .then((response) => response.json())
    .then(convertPokeApiSpecificToPokemon)
}

const buttonBig = `
    <div class="navBarSectionsNames active">
        <div class="clickableObjectNavBar" id="baseStatsId">
            <h2 id="nav1">Base Stats</h2>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#ffffffb4" stroke="#ffffffb4" class="disabled"/>
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#6a6a6a" stroke="#6a6a6a" class="greenArrow"/>
            </svg>
        </div>
    </div>
    <div class="navBarSectionsNames">
        <div class="clickableObjectNavBar" id="statisticsId">
            <h2 id="nav2">Statistics</h2>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#ffffffb4" stroke="#ffffffb4" class="disabled"/>
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#6a6a6a" stroke="#6a6a6a" class="greenArrow"/>
            </svg>
        </div>
    </div>
    <div class="navBarSectionsNames">
        <div class="clickableObjectNavBar" id="movesId">
            <h2 id="nav3">Moves</h2>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#ffffffb4" stroke="#ffffffb4" class="disabled"/>
                <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#6a6a6a" stroke="#6a6a6a" class="greenArrow"/>
            </svg>
        </div>
    </div>
    <div class="navBarSectionsNames">
        <div class="clickableObjectNavBar" id="othersId">
            <h2 id="nav4">Others</h2>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#ffffffb4" stroke="#ffffffb4" class="disabled"/>
            <path d="M15.5 1L17 2.5L8.5 11L1 2.5L2.5 1L8.5 7.5L15.5 1Z" fill="#6a6a6a" stroke="#6a6a6a" class="greenArrow"/>
        </svg>
        </div>
    </div>
    `;
const buttonSmall = `
    <select name="comidas" class="navBarSelectNames">
        <option selected value="BaseStats">Base Stats</option>
        <option value="Statistics">Statistics</option>
        <option value="Values">Values</option>
        <option value="Other">Other</option>
    </select>`;

function loadPokePage(ID) {
  urlRequest(ID).then((pokemon) => {
        console.log(pokemon);
        const pokedex = document.getElementById("pokedexId")
        const individualPageSection = document.createElement('section');
        individualPageSection.id = 'pokemonPage';

        const pokeTypesHtml = pokemon.types.length === 1 ? 
        `<span class="${pokemon.type}" style="text-transform: capitalize;">${pokemon.type}</span>` :
        `<span class="tipo1 ${pokemon.type}">${pokemon.type}</span>
        <div class="typeDivisory" id="typeDivisoryId" style="border: 20px solid;"></div>
        <div class="whiteDivisory"></div>
        <span class="tipo2 ${pokemon.types[1]}">${pokemon.types[1]}</span>`;
        const pokeWeightHtml = pokemon.weight / 10;
        const pokeHeightHtml = pokemon.height / 10;
        const heldItemsHtml = getHeldItems();
        function getHeldItems() {
            if(pokemon.heldItems.length > 0){
                return pokemon.heldItems.join(' | ')
            } else {
                return "None"
            };
        }
        function verifyStats() {
            for (let i = 0; i < pokemon.stats.length; i++) {
                const statusBarElement = document.getElementById(`status${i}`)
                if (pokemon.stats[i][1] < 40) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('veryLow');
                } else if (pokemon.stats[i][1] >= 40 && pokemon.stats[i][1] < 65) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('low');
                } else if (pokemon.stats[i][1] >= 65 && pokemon.stats[i][1] < 80) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('avarage');
                } else if (pokemon.stats[i][1] >= 80 && pokemon.stats[i][1] < 90) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('decent');
                } else if (pokemon.stats[i][1] >= 90 && pokemon.stats[i][1] < 110) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('good');
                } else if (pokemon.stats[i][1] >= 110 && pokemon.stats[i][1] < 130) {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('great');
                } else {
                    statusBarElement.className = "";
                    statusBarElement.classList.add('excellent');
                }
                
            }
        }

        function verifyAbilities() {
            const title1 = document.getElementById("abilityTitle1");
            const title2 = document.getElementById("abilityTitle2");
            const text1 = document.getElementById("abilityText1");
            const text2 = document.getElementById("abilityText2");
            const hiddenAbilityDiv = document.getElementById("hiddenAbilityDiv");
            const title3 = document.getElementById("abilityTitle3");
            const text3 = document.getElementById("abilityText3");
            let isNormal = 0;
            let isHidden = false;
            let textAbilitiesDirect = [];

            for (let i = 0; i < pokemon.abilities.length; i++) {
                if (pokemon.abilities[i][1] == true) {
                    isHidden = true;
                } else {
                    isNormal++ ;
                }
                const URL = pokemon.abilities[i][3]; 
                
                fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    /* return [data.effect_entries[0].short_effect, data.effect_entries[1].short_effect]; */
                    return data.effect_entries;
                })
                .then((convertedAbility) => {
                    for (let i = 0; i < convertedAbility.length; i++) {
                        if (convertedAbility[i].language.name == "en") {
                            textAbilitiesDirect.push(convertedAbility[i].short_effect);
                        } 
                    }
                    if (pokemon.abilities.length == 0) {
                        title1.textContent = "None";
                        text1.textContent = "-";
                        title2.textContent = "None";
                        text2.textContent = "-";
                        hiddenAbilityDiv.style.display = "none";
                    } else if (isNormal == 1) {
                        title1.textContent = `${pokemon.abilities[0][0]}:`;
                        text1.textContent = textAbilitiesDirect[0];
                        title2.textContent = "None";
                        text2.textContent = "-";
                        title3.textContent = "None";
                        text3.textContent = "-";
                    } else if (isNormal == 2) {
                        title1.textContent = `${pokemon.abilities[0][0]}:`;
                        text1.textContent = textAbilitiesDirect[0];
                        title2.textContent = `${pokemon.abilities[1][0]}:`;
                        text2.textContent = textAbilitiesDirect[1];
                        title3.textContent = "None";
                        text3.textContent = "-";
                    }
                    if (isHidden == true) {
                        title3.textContent = `${pokemon.abilities[isNormal][0]}:`;
                        text3.textContent = textAbilitiesDirect[isNormal];
                        hiddenAbilityDiv.style.display = "flex";
                    } else if (isHidden == false) {
                        hiddenAbilityDiv.style.display = "none";
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar a habilidade', error)
                })
            }
        }

        function spriteController() {
            const pokeballButton = document.querySelectorAll(".pokeballButton");
            const sprite = document.getElementById("changebleSprite")
        
            for (let i = 0; i < pokemon.sprites.length; i++) {
                const verify = pokemon.sprites[i];
                if (verify == null) { 
                    const sprite = document.getElementById("pokeball"+ [i]);
                    sprite.style.display = "none";
                }
            }
            pokeballButton.forEach(function(button) {
                button.addEventListener('click', () =>{
                    if (button.classList.contains('male-pokeball')) {
                        sprite.innerHTML = `<img src="${pokemon.sprites[0]}" alt="Pokemon Image">`
                    } else if (button.classList.contains('female-pokeball')){
                        sprite.innerHTML = `<img src="${pokemon.sprites[1]}" alt="Pokemon Image">`
                    } else if (button.classList.contains('shiny-pokeball')){
                        sprite.innerHTML = `<img src="${pokemon.sprites[2]}" alt="Pokemon Image">`
                    } else if (button.classList.contains('femaleShiny-pokeball')){
                        console.log("oi Female shiny")
                        sprite.innerHTML = `<img src="${pokemon.sprites[2]}" alt="Pokemon Image">`
                    }
                })
            });
        }

        function getColor() {
            const typeColors = {
                normal: tinycolor("#ACAA7A"),
                flying: tinycolor("#9E8FC5"),
                water: tinycolor("#6E8BC6"),
                ice: tinycolor("#98D6D5"),
                fire: tinycolor("#F17F2D"),
                dragon: tinycolor("#6357A6"),
                electric: tinycolor("#F7D233"),
                steel: tinycolor("#B8B8D2"),
                rock: tinycolor("#B9A338"),
                ground: tinycolor("#E0C166"),
                grass: tinycolor("#79C251"),
                fairy: tinycolor("#F7CBDF"),
                psychic: tinycolor("#F05889"),
                fighting: tinycolor("#C4312B"),
                bug: tinycolor("#AABA39"),
                poison: tinycolor("#9E4399"),
                dark: tinycolor("#725A4A"),
                ghost: tinycolor("#71599A"),
            }

            const pokeCard = document.getElementById('pokeCard');
            const spriteControls = document.getElementById('spriteControlId');
            const navBar = document.getElementById('outerNavBarDiv');
            const sideInfo = document.getElementById('side_infoTableId');
            const navButton = document.getElementById('nav1');
            
            const typesDivisory = document.getElementById('typeDivisoryId')

            function generateGradient(color) {
                const baseColor = tinycolor(color);
                const color1 = baseColor.lighten(10).toString();
                const color2 = baseColor.darken(10).toString();
                const color3 = baseColor.darken(10).toString();
                const newBaseColor = tinycolor(color);
                const color4 = newBaseColor.clone().darken(20).setAlpha(.4).toString();
                const color5 = newBaseColor.clone().lighten(45).toString();

                if (color._originalInput == "#F7CBDF") {
                    const colorPink = baseColor.lighten(10).darken(5).toString();
                    pokeCard.style.background = `linear-gradient(25deg, ${color2} 9.74%, ${color1} 190.93%)`;

                    spriteControls.style.background = `linear-gradient(77.87deg, ${colorPink} -26.05%, ${color1} 250.65%)`;

                    navBar.style.background = `linear-gradient(2deg, ${color2} -12.52%, ${color1} 180.09%)`;

                    sideInfo.style.background = `linear-gradient(105.4deg, #FFFFFF 3.9%, ${color5} 100%)`;

                    navBar.style.boxShadow = `1px 5px 10px ${color4}`; 

                    
                } else if (color._originalInput == "#9E4399") {
                    pokeCard.style.background = `linear-gradient(190.58deg, ${color2} 9.74%, ${color1} 90.93%)`;

                    spriteControls.style.background = `linear-gradient(77.87deg, ${color3} -26.05%, ${color1} 250.65%)`;

                    navBar.style.background = `linear-gradient(357deg, ${color2} -12.52%, ${color1} 180.09%)`;

                    sideInfo.style.background = `linear-gradient(105.4deg, #FFFFFF 3.9%, ${color5} 100%)`;

                    navBar.style.boxShadow = `1px 5px 10px ${color4}`; 
                    
                    navButton.style.color = "#4e4e4e";
                }else {

                pokeCard.style.background = `linear-gradient(190.58deg, ${color2} 9.74%, ${color1} 90.93%)`;

                spriteControls.style.background = `linear-gradient(77.87deg, ${color3} -26.05%, ${color1} 250.65%)`;

                navBar.style.background = `linear-gradient(357deg, ${color2} -12.52%, ${color1} 180.09%)`;

                sideInfo.style.background = `linear-gradient(105.4deg, #FFFFFF 3.9%, ${color5} 100%)`;

                navBar.style.boxShadow = `1px 5px 10px ${color4}`; 
                }
            }
            const pokemonType = pokemon.type.toLowerCase();
            const originalColor = typeColors[pokemonType];
            generateGradient(originalColor);

            const pokemonSecondType = pokemon.types[1].toLowerCase();
            const secondColor = typeColors[pokemonSecondType];

            typesDivisory.style.borderColor = `${originalColor._originalInput} ${secondColor._originalInput} ${secondColor._originalInput} ${originalColor._originalInput}`;
        }
        
        function verifyNavButtons() {
            const winWidth = window.innerWidth;
            const navBarHtml = document.getElementById('navBarId');
    
            if (winWidth < 993) {
                navBarHtml.innerHTML = buttonSmall
            } else if (winWidth >= 993) {
                navBarHtml.innerHTML = buttonBig
            }
        }

        function addListenersToNavButtons() {
            const buttons = Array.from(document.querySelectorAll('.clickableObjectNavBar'));
            console.log(buttons);
            buttons.forEach(bttn => {
                bttn.addEventListener('click', function() {
                    console.log(`Você escolheu o botão ${this.id}`);
                    buttons.forEach(button => { 
                        const parentElement = button.parentElement;
                        parentElement.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }); 
            });
        };

        const pokeAbilitiesHtml = 
        `<div class="normalAbilities">
            <article class="ability1">
                <small class="subCardSubtitles">First Ability -</small>
                <p class="abilityTitle" id="abilityTitle1">Carregando...</p>
                <p class="abilityText" id="abilityText1">Carregando...</p>
            </article>
            <article class="ability2">
                <small class="subCardSubtitles">Second Ability -</small>
                <p class="abilityTitle" id="abilityTitle2">Carregando...</p>
                <p class="abilityText" id="abilityText2">Carregando...</p>
            </article>
        </div>
        <div class="hiddenAbility" id="hiddenAbilityDiv">
            <div class="hiddenAbilityCSS" onclick="openHiddenAbility()" id="hiddenAbilityId">
                <div class="arrowButton">
                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 2L3 6.5L7.5 11L6.50006 12L1 6.5L6.50006 1L7.5 2Z" fill="#929292" stroke="#929292"/>
                    </svg>    
                </div>
                <article class="ability3">
                    <small class="subCardSubtitles">Hidden Ability -</small>
                    <p class="abilityTitle" id="abilityTitle3"></p>
                    <p class="abilityText" id="abilityText3">None.</p>
                </article>
            </div>
        </div>`;
        
        const newPokePage = `
        <div class="backButtonDiv" id="backButtonDiv">
            <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2L3 6.5L7.5 11L6.50006 12L1 6.5L6.50006 1L7.5 2Z" fill="#737373" stroke="#737373" id="backButton"/>
            </svg>
            <label for="backButton"><p>Back</p></label>
        </div>
        <div class="pokemonPage_content" id="pokePageContent">
            <section class="poke-card" id="pokeCard">
                <div class="identification">
                    <span class="nameId">
                        ${pokemon.name}
                    </span>
                    <span class="numberId">
                        #${pokemon.number}
                    </span>
                </div>
                <nav class="spriteControl" id="spriteControlId">
                    <div class="male-pokeball pokeballButton" id="pokeball0"></div>
                    <div class="female-pokeball pokeballButton" id="pokeball1"></div>
                    <div class="shiny-pokeball pokeballButton" id="pokeball2"></div>
                    <div class="femaleShiny-pokeball pokeballButton" id="pokeball3"></div>
                </nav>
                <figure class="backgroundDetail">
                    <img src="./assets/images/pokeball_vetor.png" alt="Background Detail">
                </figure>
                <section class="pokemon_info_subCard">
                    <div id="subCard-content">
                        <figure class="pokemon_sprite">
                            <div class="pokemon_sprite_inner" id="changebleSprite">
                                <img src="${pokemon.sprites[0]}" alt="Pokemon Image">
                            </div>
                        </figure>
                        <div class="pokeCry">
                            <div class="pokeCry-content">
                                <h1>Pokemon Cry</h1>
                                <div class="pokeCry-audioPlayer">
                                    <audio src="${pokemon.cry}" controls id="audio"></audio>
                                    <div class="audioPlayer-controls">
                                        <svg width="25" height="28" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg"  id="startButton">
                                            <g style="mix-blend-mode:plus-darker">
                                                <path d="M0.0012022 3.70239C0.00120196 1.39299 2.5012 -0.0503904 4.5012 1.10431L18.0199 8.90936C20.0199 10.0641 20.0199 12.9508 18.0199 14.1055L4.50121 21.9106C2.50121 23.0653 0.00120207 21.6219 0.00120204 19.3125L0.0012022 3.70239Z" fill="#909090"/>
                                            </g>
                                        </svg>
                                        <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg"id="pauseButton">
                                            <g style="mix-blend-mode:plus-darker">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.408 0C12.0426 0.0730775 11.7068 0.215097 11.408 0.405514C10.4801 0.996785 9.90794 2.0547 9.90796 2.96419V18.5743C9.90793 19.8508 10.4813 20.734 11.4099 21.2182C11.7089 21.3742 12.0446 21.4887 12.4099 21.5618C12.7754 21.4887 13.1111 21.3741 13.4099 21.2181C14.3378 20.7338 14.9099 19.8507 14.9099 18.5743L14.9099 2.96419C14.9099 2.05463 14.3366 0.996624 13.408 0.405379C13.109 0.21503 12.7733 0.0730602 12.408 0ZM3.50003 0.405379C3.20108 0.21503 2.86531 0.0730603 2.49999 0C2.13459 0.0730775 1.79886 0.217363 1.50003 0.411209C0.572122 1.01313 -1.22675e-05 2.09289 1.90938e-06 3.00238L1.01335e-09 18.6125C-2.78337e-05 19.889 0.573367 20.7503 1.50196 21.2239C1.80091 21.3764 2.13668 21.4887 2.50199 21.5618C2.86739 21.4887 3.20312 21.3741 3.50195 21.2181C4.42983 20.7338 5.00194 19.8507 5.00192 18.5743L5.00191 2.96419C5.00193 2.05463 4.4286 0.996624 3.50003 0.405379Z" fill="#909090"/>
                                            </g>
                                        </svg>
                                            
                                        <input type="range" id="seekBar" value="0" max="100">
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class="pokeTypes">
                            <h1 class="subCardTitles">Types</h1>
                            <div class="typesBox grass">
                                ${pokeTypesHtml}
                            </div>
                        </div>
                        <div class="pokeAbilities">
                            <h1 class="subCardTitles">Abilities:</h1>
                            <div class="abilitiesText">
                                ${pokeAbilitiesHtml}
                            </div>
                        </div>
                        <div class="sub-footer">
                            <div class="pokeMeasurement">
                            <div class="weight">
                                <p class="measurementP"><span class="subCardTitles">Weight: </span><span class="pokeMeasure">${pokeWeightHtml} kg</span></p>
                                <p class="measurementP"><span class="subCardTitles">Height: </span><span class="pokeMeasure">${pokeHeightHtml} m</span></p>
                            </div>
                            </div>
                            <div class="heldItems">
                                <p  class="subCardTitles">Held items: ${heldItemsHtml}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section class="side_infoTable" id="side_infoTableId">
                <nav class="top_navBar" id="outerNavBarDiv">
                    <div class="navBar" id="navBarId">
                        
                    </div>
                </nav>
                <div class="stats">
                    <div class="statsDiv">
                        <h2 class="statsText-1">${pokemon.stats[0][0]} - ${pokemon.stats[0][1]}</h2>
                        <div id="statusBar1" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[0][1]}" max="255" class="lowStat" id="status0">
                            <p class="statusBarNumber">255</p>
                        </div>
                    </div>
                    <div class="statsDiv">
                        <h2 class="statsText-2">${pokemon.stats[1][0]} - ${pokemon.stats[1][1]}</h2>
                        <div id="statusBar2" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[1][1]}" max="255" class="lowStat" id="status1">
                            <p class="statusBarNumber">255</p>
                        </div>
                    </div>
                    <div class="statsDiv">
                        <h2 class="statsText-3">${pokemon.stats[2][0]} - ${pokemon.stats[2][1]}</h2>
                        <div id="statusBar3" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[2][1]}" max="255" class="lowStat" id="status2">
                            <p class="statusBarNumber">255</p>
                        </div>
                    </div>
                    <div class="statsDiv">
                        <h2 class="statsText-4">${pokemon.stats[3][0]} - ${pokemon.stats[3][1]}</h2>
                        <div id="statusBar4" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[3][1]}" max="255" class="lowStat" id="status3">
                            <p class="statusBarNumber">255</p>
                        </div> 
                    </div>
                    <div class="statsDiv">
                        <h2 class="statsText-5">${pokemon.stats[4][0]} - ${pokemon.stats[4][1]}</h2>
                        <div id="statusBar5" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[4][1]}" max="255" class="lowStat" id="status4">
                            <p class="statusBarNumber">255</p>
                        </div>
                    </div>
                    <div class="statsDiv">
                        <h2 class="statsText-6">${pokemon.stats[5][0]} - ${pokemon.stats[5][1]}</h2>
                        <div id="statusBar6" class="statusBarClass">
                            <input type="range" disabled value="${pokemon.stats[5][1]}" max="255" class="lowStat" id="status5">
                            <p class="statusBarNumber">255</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>`

        individualPageSection.innerHTML = newPokePage;
        mainElement.appendChild(individualPageSection);
        pokedex.classList.add("pokedexActivated")
        document.body.style.overflow = 'hidden';

        
        verifyNavButtons()
        verifyAbilities()
        verifyStats();
        audioControls();
        spriteController();
        backButton();
        individualPageSection.lastElementChild.classList.add('suspenso');
        getColor();
        addListenersToNavButtons();
  });
}

//Back button
function backButton() {
    const backButton = document.getElementById('backButtonDiv');
    const pokemonPage = document.getElementById('pokemonPage');
    const pokedex = document.getElementById('pokedexId')
    backButton.classList.add('suspenso');
    backButton.addEventListener('click', () => {
        pokemonPage.style.cssText = 'transform: translateY(100vh)';
        pokemonPage.remove();
        pokedex.classList.remove("pokedexActivated");
        backButton.removeEventListener;
        document.body.style.overflow = 'auto';
    });
}


//Audio Controls
function audioControls() {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const seekBar = document.getElementById('seekBar');

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
        } else {
            audio.pause();
            playButton.textContent = 'Play';
        }
    });

    pauseButton.addEventListener('click', function() {
        audio.pause();
        pauseButton.style.display = 'none';
        playButton.style.display = 'inline-block';
    })

    audio.addEventListener('timeupdate', () => {
        seekBar.value = (audio.currentTime / audio.duration) * 100;

        if (audio.ended) {
            seekBar.value = 0;
            pauseButton.style.display = 'none';
            playButton.style.display = 'inline-block';
        }
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });
}
function openHiddenAbility() {
    const abilityInnerDiv = document.getElementById("hiddenAbilityId");
    const abilityOuterDiv = document.getElementById("hiddenAbilityDiv")
    abilityInnerDiv.classList.toggle("transformedAbility");
    abilityOuterDiv.classList.toggle("abilityActivated");
}

function navBarButton() {
    const a = b;
    f=a 
}

window.addEventListener('resize', function(event) {
    var winWidth = window.innerWidth;

    const navBarHtml = document.getElementById('navBarId');
    function navBarUpdate() {
        if (winWidth < 993) {
            if (navBarHtml.innerHTML == buttonSmall) {
                console.log("Botão Estilo grande está Ok");
            } else {navBarHtml.innerHTML = buttonSmall;}
        } else if (winWidth >= 993){
            if (navBarHtml.innerHTML == buttonBig) {
                console.log("Botão Estilo grande está Ok");
            } else {navBarHtml.innerHTML = buttonBig;}
        }
    }
    navBarUpdate();
});
