//Selector Elements
const weaImgEle = document.querySelector(".weatherImg");
const temEle = document.querySelector(".temperature p");
const weaDesEle = document.querySelector(".weatherDescription p");
const locEle = document.querySelector(".location p");
//const humidityElement = document.querySelector(".humidity")
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
//fetching weather from API
function pullWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    //console.log(api);

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            //weather.humidity = data.main.humidity;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            printWeatherData();
        });
}
//display weather to UI
function printWeatherData() {
    weaImgEle.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temEle.innerHTML = `${weather.temperature.value}<span>C</span>`;
    weaDesEle.innerHTML = weather.description;
    //humidityElement.innerHTML = weather.humidity;
    locEle.innerHTML = `${weather.city}, ${weather.country}`;
}