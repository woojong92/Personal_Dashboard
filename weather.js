const weather = document.querySelector(".js-weather");

const API_KEY = "550516674abc77478478b549c21fe570";
const COORDS ="coords";

function getWeather(lat, log){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`)
    .then(function(res) {
        //console.log(res.json());
        return res.json();
    })
    .then(function(json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("err");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if( loadedCords === null ) {
        askForCoords();
    }else{
        const parseCoods = JSON.parse(loadedCords);
        //console.log(parseCoods);
        getWeather(parseCoods.latitude, parseCoods.longitude);
    }
}

function init() {
    loadCoords();
}

init();