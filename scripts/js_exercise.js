// Select the HTML element to manipulate
const today1 = document.querySelector('#today1');
const today2 = document.querySelector('#today2');
const message = document.querySelector('aside');

// Varibles for activity use
let citynames = ["New York","Sacramento","Cleveland","South Bend","Tampa Bay","Corpus Christi"];
let volume = 409;

function getCelsius(fahrenheit) {
    return celsius = (fahrenheit - 32) * (5 / 9);

}

// Set up the Date format object parameter for toLocaleDateString method.
const options = {
        month: "short",
		day: "2-digit",
		year: "numeric"
	};

// Question #4
today1.innerHTML = new Date().toLocaleDateString("en-US", options);
// Question #5
today2.innerHTML = `<strong>Volume</strong>: ${volume} liters`;
// Question #6
let quantity = document.querySelector('#q').value;
// Question #7
document.querySelector('aside').innerHTML = 'Welcome to <em>our</em> neighborhood!';
// Question #8
document.querySelector('#temp').value = `${getCelsius(33).toFixed(1)} °C`;
// Question #9
const divs = document.querySelectorAll('div');
const displayDiv = document.getElementById('divs');
displayDiv.textContent = `There are ${divs.length} div elements on the page.`;
// Question #10
let filterC = citynames.filter(city => city.charAt(0) === 'C');
document.querySelector('#c-names').textContent = filterC;

