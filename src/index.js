import { currentWeather } from './CurrentWeather';
import { futureForecast } from './FutureForecast';

let currentWeatherData;
let futureForecastData;
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

// Update data/display
async function update(location, units) {
    currentWeatherData = await currentWeather.setCurrentWeather(location, units);
    futureForecastData = await futureForecast.setFutureForecast(location, units);
    console.log(currentWeatherData);
    console.log(futureForecastData);
}

update(location, units);


