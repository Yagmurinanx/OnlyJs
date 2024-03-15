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


function renderCharacters() {
     fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('charactersContainer');
        container.innerHTML = '';
  
        const characterCardTemplate = character => `
        <div class="character card m-3" style="width: 13rem;">
        <img src="${character.pic}" class="card-img-top" alt="${character.name}" style="height: 13rem;">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Homeworld: ${character.homeworld || "Bilinmiyor"}</p>
        </div>
      </div>
        `;
  
        data.characters.forEach(character => {
          container.innerHTML += characterCardTemplate(character);
        });
      })
      .catch(error => console.error(error));
  }

  function removeCharacters(){
    const container = document.getElementById('charactersContainer');
    container.innerHTML = "";
  }
  
