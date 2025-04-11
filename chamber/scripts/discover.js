const cards = document.querySelector("#items-of-interest");
const path = "data/places.json";

async function getAreas() {
    try {
        const response = await fetch(path);
        const data = await response.json();
        //console.log(data.areas);
        console.log("Data loaded:", data.places);
        displayAreas(data.places);
    } catch (error) {
        console.error("Error fetching areas:", error);
    }
}
getAreas();

const displayAreas = (areas) => {
    // Sort the array alphabetically by the 'name' property
    areas.sort((a, b) => a.name.localeCompare(b.name));

    areas.forEach((area) => {
        let title = document.createElement('h2');
        let image = document.createElement('figure');
        let address = document.createElement('address');
        let description = document.createElement('p');
        let button = document.createElement('button');

        title.textContent = area.name;
        image.innerHTML = `
            <img src="${area.image}" alt='Image for ${area.name}' width='300px' height='auto' loading='lazy'>
            <figcaption>Image for ${area.name}</figcaption>`;
        address.textContent = area.address;
        description.textContent = area.description;
        button.textContent = "Learn More";

        const areaSection = document.createElement('section');
        areaSection.appendChild(title);
        areaSection.appendChild(address);
        areaSection.appendChild(image);
        areaSection.appendChild(description);
        areaSection.appendChild(button);

        cards.appendChild(areaSection);
    });
}

const visitorMessage = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysDifference = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysDifference < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitorMessage.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago.`;
    }
}

localStorage.setItem('lastVisit', currentVisit);