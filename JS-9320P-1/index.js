let isCharacterDisplayed = false;

function toggleCharacters(){
  const buttonEl = document.getElementById("renderButton");

 
  buttonEl.textContent = buttonEl.dataset.active === "true" ? "Karakterleri Göster" : "Karakterleri Gizle";


  buttonEl.classList.toggle("btn-outline-success");
  buttonEl.classList.toggle("btn-outline-danger");


  buttonEl.dataset.active = buttonEl.dataset.active === "true" ? "false" : "true";
  if (isCharacterDisplayed) {
    removeCharacters();
  }else {
    renderCharacters();
  }
  isCharacterDisplayed = !isCharacterDisplayed;
}


async function renderCharacters(filteredCharacters = null) {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    const charactersToRender = filteredCharacters ? filteredCharacters : data.characters;

    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';

    const characterCardTemplate = character => `
      <div class="character card m-3" style="width: 13rem;">
        <img src="${character.pic}" class="card-img-top" alt="${character.name}" style="height: 13rem;">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Homeworld: ${character.homeworld ?? "other" }</p>
        </div>
      </div>
    `;

    charactersToRender.forEach(character => {
      container.innerHTML += characterCardTemplate(character);
    });
  } catch (error) {
    console.error(error);
  }
}


  function removeCharacters(){
    const container = document.getElementById('charactersContainer');
    container.innerHTML = "";
  }
  
//  PART-2
  
async function homeworlds() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      const characters = data.characters;
  
     
      const homeworlds = characters.map(character => (character.homeworld ?? "other").toLowerCase());

  
      console.log(homeworlds); 
  
      return homeworlds;
    } catch (error) {
      console.error('Error:', error);
    }
  }
 

  let uniqueHomeworlds;

  async function homeworldsUnique() {
  try {
    const homeworldsArray = await homeworlds();
    uniqueHomeworlds = [...new Set(homeworldsArray)];

    const homeworldsListDiv = document.getElementById('homeworldsList');

    uniqueHomeworlds.forEach((homeworld, index) => {
      const idName = `homeworld_${homeworld.replace(/\s+/g, '_')}_${index}`;

      const divContainer = document.createElement('div');
      divContainer.classList.add('form-check');

      const radioButton = document.createElement('input');
      radioButton.classList.add('form-check-input');
      radioButton.type = 'radio';
      radioButton.name = 'homeworld';
      radioButton.value = homeworld;
      radioButton.id = idName;

      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.htmlFor = idName;
      label.textContent = homeworld;

      divContainer.appendChild(radioButton);
      divContainer.appendChild(label);
      homeworldsListDiv.appendChild(divContainer);

      radioButton.addEventListener('change', setFilteredHomeworld);
    });

    return uniqueHomeworlds;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function setFilteredHomeworld() {
  const selectedRadio = document.querySelector('input[name="homeworld"]:checked');
  const filteredHomeworldsDiv = document.getElementById('filtered-Homeworld');

  if (selectedRadio) {
    const selectedHomeworld = selectedRadio.value;

    try {
      const response = await fetch('data.json');
      const data = await response.json();

      let filteredCharacters;
      if (selectedHomeworld === "other") {
        filteredCharacters = data.characters.filter(
          (character) => character.homeworld === null || character.homeworld === undefined
        );
      } else {
        filteredCharacters = data.characters.filter(
          (character) => character.homeworld === selectedHomeworld
        );
      }

      renderCharacters(filteredCharacters);
    } catch (error) {
      console.error('Error filtering characters:', error);
    }
  } else {
    renderCharacters();
  }
}

const filterButton = document.createElement('button');
filterButton.textContent = 'Filtrele';
filterButton.classList.add('btn', 'btn-outline-primary', 'font-weight-bold');
filterButton.id = 'filterButton';
filterButton.addEventListener('click', toggleHomeworldsList);

const homeworldsListDiv = document.getElementById('homeworldsList');
homeworldsListDiv.classList.add('hidden'); 
homeworldsListDiv.parentNode.insertBefore(filterButton, homeworldsListDiv);

function toggleHomeworldsList() {
  const homeworldsList = document.getElementById('homeworldsList');
  homeworldsList.classList.toggle('hidden');
}

homeworldsUnique();











  