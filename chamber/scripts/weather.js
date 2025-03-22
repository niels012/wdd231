// select HTML elements in the document
const currentTemp = document.querySelector('#current-temperature');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#current-weather-description');
const forecast = document.querySelector('#weather-forecast');

const lat = "11.2999";
const lon = "124.6838";
const apiKey = "1b6cb5fd5cc7a2b9ff789ecdd637767a";
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function apiFetchCurrent() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiFetchForecast() {
    try {
        const response = await fetch(weatherForecastUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayWeatherForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetchCurrent();
apiFetchForecast();

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)} &deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = `${data.weather[0].description}`;
}

function displayWeatherForecast(data) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const forecast = document.getElementById('forecast');

    const forecastIndices = [0, 8, 16];

    forecastIndices.forEach((index, i) => {
        const dayTemp = document.createElement('p');
        const dayName = dayNames[(d.getDay() + i + 1) % 7];

        dayTemp.innerHTML += `${dayName}: <b>${Math.round(data.list[index].main.temp)} &deg;C </b>`;
        forecast.appendChild(dayTemp);
    });
}