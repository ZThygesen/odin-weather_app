import { currentWeather } from './CurrentWeather';
import { futureForecast } from './FutureForecast';
import { displayCurrent } from './DisplayCurrent';
import { displayFuture } from './DisplayFuture';

let currentWeatherData;
let futureForecastData;
let location = 'College Station';
let units = 'imperial';
const error = document.querySelector('.error');

// Location changes
const locationInput = document.querySelector('#location-input');
const submitLocation = document.querySelector('#search');
submitLocation.addEventListener('click', (e) => changeLocation(e));

function changeLocation(e) {
    e.preventDefault();
    
    location = locationInput.value;
    locationInput.value = "";
    update(location, units);
}

// Unit changes
const unitBtns = document.querySelectorAll('input[name="units"]');
unitBtns.forEach(btn => btn.addEventListener('change', changeUnits));

function changeUnits() {
    units = (units === 'metric') ? 'imperial' : 'metric';
    update(location, units);
}

// Update data/display
async function update(location, units) {
    currentWeatherData = await currentWeather.setCurrentWeather(location, units);
    futureForecastData = await futureForecast.setFutureForecast(location, units);

    if (currentWeatherData instanceof Error || futureForecastData instanceof Error) {
        error.textContent = 'Error: city not found';
        return;
    } else {
        error.textContent = '';
    }

    displayCurrent.display(currentWeatherData);
    displayFuture.display(futureForecastData);
}

update(location, units);


