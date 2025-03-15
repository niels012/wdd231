const cards = document.querySelector('#cards');
const table = document.querySelector('#table-view');
const gridButton = document.querySelector('#grid-button');
const tableButton = document.querySelector('#table-button');
let members = [];

async function getMemberData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) throw new Error('Could not fetch member data');
        
        members = await response.json();
        members.sort((a, b) => a.name.localeCompare(b.name));
        
        displayMemberCards(); // Default view
    } catch (error) {
        console.error("Encountered error during fetch:", error);
        cards.innerHTML = "<p class='error'>Failed to load directory data. Please try again later.</p>";
    }
}

function displayMemberCards() {
    table.classList.add('hide');
    cards.classList.remove('hide');
    cards.innerHTML = '';
    
    members.forEach((member, index) => {
        const card = document.createElement('section');
        card.classList.add('card');

        const name = document.createElement('h2');
        name.textContent = member.name;

        const image = document.createElement('img');
        image.src = `images/${member.img}`;
        image.alt = `${member.name} Business Logo`;
        image.width = 500;
        image.height = 500;
        image.loading = 'lazy';

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details-div');

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone_number;

        const urlP = document.createElement('p');
        const url = document.createElement('a');
        url.href = `http://${member.website_url}`;
        url.textContent = member.website_url;
        url.target = '_blank';
        
        urlP.appendChild(url);
        detailsDiv.append(address, phone, urlP);
        card.append(name, image, detailsDiv);
        cards.appendChild(card);
    });
}

function displayMemberTable() {
    cards.classList.add('hide');
    table.classList.remove('hide');
    table.innerHTML = '';

    const tableHeaderRow = document.createElement('tr');
    const headers = ['Company Name', 'Address', 'Phone Number', 'Website'];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        tableHeaderRow.appendChild(th);
    });

    tableHeaderRow.classList.add('visually-hidden');
    table.appendChild(tableHeaderRow);
    
    members.forEach(member => {
        const tableRow = document.createElement('tr');

        const companyTd = document.createElement('td');
        companyTd.classList.add('bold');
        companyTd.textContent = member.name;

        const addressTd = document.createElement('td');
        addressTd.textContent = member.address;

        const phoneTd = document.createElement('td');
        phoneTd.textContent = member.phone_number;

        const urlTd = document.createElement('td');
        const url = document.createElement('a');
        url.classList.add('url-table');
        url.href = `http://${member.website_url}`;
        url.textContent = member.website_url;
        url.target = '_blank';
        urlTd.appendChild(url);

        tableRow.append(companyTd, addressTd, phoneTd, urlTd);
        table.appendChild(tableRow);
    });
}

// Event Listeners
gridButton.addEventListener('click', displayMemberCards);
tableButton.addEventListener('click', displayMemberTable);

// Initialize Data
getMemberData();
