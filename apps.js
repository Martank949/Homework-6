//Selector Elements
const weaImgEle = document.querySelector(".weatherImg");
const temEle = document.querySelector(".temperature p");
const weaDesEle = document.querySelector(".weatherDescription p");
const locEle = document.querySelector(".location p");
const errNotEle = document.querySelector(".errorNotification");
//const humidityElement = document.querySelector(".humidity")
//app data
const weather = {};
//C -> F const
const kelvin = 273;

weather.temperature = {
    unit: "celsius"
}

//API key
const key = "1aa83ce61dc71bbaa60ca7afd3134d3d";

//errorNotification checker for Geo
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    errNotEle.style.display = "block";
    errNotEle.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
//display error if Geo service is down
function showError(error) {
    errNotEle.style.display = "block";
    errNotEle.innerHTML = `<p> ${error.message} </p>`;
}
//users locations using latitude and longitude from API & browser
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    pullWeather(latitude, longitude);
}
// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function() {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});