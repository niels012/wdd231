const cards = document.querySelector('#cards');
const table = document.querySelector('#table-view');
let members = []

async function getMemberData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch member data');
        }
        members = await response.json();
        members.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        displayMemberCards()
    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getMemberData();

function displayMemberCards() {
    table.classList.add('hide');
    cards.classList.remove('hide');
    cards.innerHTML = '';
    members.forEach((member, index) => {
        // create html elements
        const card = document.createElement('section');
        const name = document.createElement('h2');
        const image = document.createElement('img');
        const detailsDiv = document.createElement('div');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const urlP = document.createElement('p');
        const url = document.createElement('a');

        // set content / attributes
        name.textContent = `${member.name}`;
        card.setAttribute('class', 'card');
        image.setAttribute('src', `images/${member.img}`);
        image.setAttribute('alt', `${member.name} Business Logo`);
        address.textContent = `${member.address}`;
        phone.textContent = member.phone_number;
        url.href = `http://${member.website_url}`;
        url.textContent = member.website_url;
        url.target = '_blank';
        // Only add lazy loading for images after the first one
        if (index !== 0) {
            image.setAttribute('loading', 'lazy');
        }
        image.setAttribute('width', '500');
        image.setAttribute('height', '500');
        detailsDiv.setAttribute('class', 'details-div');

        // add name and img to card
        card.appendChild(name);
        card.appendChild(image);
        detailsDiv.appendChild(address);
        detailsDiv.appendChild(phone);
        urlP.appendChild(url)
        detailsDiv.appendChild(urlP);
        card.appendChild(detailsDiv);

        // add card to cards element in html
        cards.appendChild(card);
    })
}

function displayMemberTable() {
    cards.classList.add('hide');
    table.classList.remove('hide');
    table.innerHTML = '';
    const tableHeaderRow = document.createElement('tr');
    const tableHeader1 = document.createElement('th');
    const tableHeader3 = document.createElement('th');
    const tableHeader4 = document.createElement('th');
    const tableHeader5 = document.createElement('th');
    tableHeader1.textContent = 'Company Name';
    tableHeader3.textContent = 'Address';
    tableHeader4.textContent = 'Phone Number';
    tableHeader5.textContent = 'Website';
    tableHeaderRow.appendChild(tableHeader1);
    tableHeaderRow.appendChild(tableHeader2);
    tableHeaderRow.appendChild(tableHeader3);
    tableHeaderRow.appendChild(tableHeader4);
    tableHeaderRow.appendChild(tableHeader5);
    tableHeaderRow.classList.add('visually-hidden');
    table.appendChild(tableHeaderRow);
    members.forEach(member => {
        const tableRow = document.createElement('tr');
        const companyTd = document.createElement('td');
        const addressTd = document.createElement('td');
        const phoneTd = document.createElement('td');
        const urlTd = document.createElement('td');
        const url = document.createElement('a');
        companyTd.classList.add('bold');
        companyTd.textContent = member.name;
        addressTd.textContent = `${member.address}`;
        phoneTd.textContent = member.phone;
        url.classList.add('url-table');
        url.href = `http://${member.website_url}`;
        url.textContent = member.website_url;
        url.target = '_blank';
        urlTd.appendChild(url);
        tableRow.appendChild(companyTd);
        tableRow.appendChild(addressTd);
        tableRow.appendChild(phoneTd);
        tableRow.appendChild(urlTd);
        table.appendChild(tableRow);
    });
}

// select display choice buttons
const gridButton = document.querySelector('#grid-button');
const tableButton = document.querySelector('#table-button');

// create event listeners for display choice
gridButton.addEventListener('click', () => {
    displayMemberCards();
});
tableButton.addEventListener('click', () => {
    displayMemberTable();
});