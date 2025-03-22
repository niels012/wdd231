const spotlightDiv = document.querySelector('#spotlight');
const path = './data/members.json';

async function getMembers() {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Could not fetch member data");

        const data = await response.json();
        const spotlightMembers = data.members.filter(member => member.membership_level > 1);
        displayMembers(spotlightMembers);
    } catch (error) {
        console.error("Error fetching spotlight members:", error);
        spotlightDiv.innerHTML = "<p class='error'>Failed to load spotlight members. Please try again later.</p>";
    }
}

const displayMembers = (myArray) => {
    spotlightDiv.innerHTML = ''; // Clear previous content

    myArray.sort(() => 0.5 - Math.random()) // Randomize order
          .slice(0, 3) // Pick 3 random members
          .forEach(member => {
        
        const card = document.createElement('section');
        card.classList.add('card'); // Apply the same class as the main card structure

        const name = document.createElement('h2');
        name.textContent = member.name;

        const image = document.createElement('img');
        image.src = `images/${member.img}`;
        image.alt = `${member.name} Business Logo`;
        image.width = 500;
        image.height = 500;
        image.loading = 'lazy';

        // Fallback image in case of an error
        image.onerror = () => {
            image.src = 'images/placeholder.png'; // Replace with an actual placeholder
        };

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details-div'); // Same container for details

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone_number;


        const url = document.createElement('a');
        url.href = member.website_url.startsWith("http") ? member.website_url : `http://${member.website_url}`;
        url.textContent = member.website_url.replace(/^https?:\/\//, ''); // Clean display
        url.target = '_blank';


        detailsDiv.append(address, phone);
        card.append(name, image, detailsDiv);

        // Membership level styling
        if (member.membership_level === 3) {
            card.style.border = "5px solid gold";
            card.style.backgroundColor = "#fff9e6";
        } else if (member.membership_level === 2) {
            card.style.border = "5px solid silver";
            card.style.backgroundColor = "#f0f0f0";
        }

        spotlightDiv.appendChild(card);
    });
};

// Fetch and display spotlight members on page load
getMembers();
