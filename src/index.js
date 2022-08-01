import { setCurrentWeather } from './CurrentWeather';
import { setFutureForecast } from './FutureForecast';

let currentWeatherData;
let location = 'College Station';
let units = 'imperial';

// Location changes
const locationInput = document.querySelector('#location');
const submitLocation = document.querySelector('#search');
submitLocation.addEventListener('click', (e) => changeLocation(e));

function changeLocation(e) {
    e.preventDefault();
    
    location = locationInput.value;
    update(location, units);
}

// Unit changes
const unitBtns = document.querySelectorAll('input[name="units"]');
unitBtns.forEach(btn => btn.addEventListener('change', changeUnits));

function changeUnits() {
    units = (units === 'metric') ? 'imperial' : 'metric';
    update(location, units);
}

/*
// Temperature unit changes
const tempUnitBtns = document.querySelectorAll('input[name="temp-units"]');
tempUnitBtns.forEach(btn => btn.addEventListener('change', changeTempUnits));

function changeTempUnits() {
    tempUnits = (tempUnits === 'celsius') ? 'fahrenheit' : 'celsius';
    update(location, tempUnits);
}
*/

// Update data/display
async function update(location, units) {
    currentWeatherData = await setCurrentWeather(location, units);
    console.log(currentWeatherData)
}

update(location, units);

setFutureForecast('Oakville', units);

