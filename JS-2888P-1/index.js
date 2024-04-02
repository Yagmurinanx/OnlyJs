async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await response.json();
        return usersData;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

function createUserCard(user) {
    const card = document.createElement('div');
    const addressObj = {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
     
      };

    const companyObj = {
        companyName: user.company.name,

    };
      


    card.classList.add('card');
    card.innerHTML = `
        <div class="bg uwu"></div>
        <div class="bg"></div>
        <div class="content">
            <div class="img">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path>
                </svg>
            </div>
            <div class="h1">
           ${user.name}<br>
           
            </div>
            
            <div class="p">
            <p><i class="fa-regular fa-user"></i>   ${user.username}<br></p>
            <i class="fa-regular fa-building"></i> ${companyObj.companyName}
                <p>
                <i class="fa-solid fa-house"></i> ${addressObj.city}-${addressObj.street
             }
                </p>
               
                <p>
                <i class="fa-regular fa-address-book"></i> ${user.phone}<br> ${user.website}
                </p>
            </div>
        </div>
    `;
    return card;
}

async function createCards() {
    const usersData = await fetchUsers();
    const cardsContainer = document.getElementById('user-cards-container');

    usersData.forEach(user => {
        const card = createUserCard(user);
        cardsContainer.appendChild(card);
    });
}

window.onload = createCards;
