/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 1:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCurrentWeather": () => (/* binding */ setCurrentWeather)
/* harmony export */ });
const currentWeather = {
    dateTime: "",
    temp: 0,
    realFeel: 0,
    weatherDesc: "",
    windDirection: "",
    windSpeed: 0,
    windGusts: 0,
    humidity: 0,
    pressure: 0,
    weatherIcon: "",
}

async function setCurrentWeather(location, units) {
    try {
        const data = await getData(location, units);
        console.log(data);

        setDateTime(data.dt + data.timezone);
        setTemperatures(data.main.temp, data.main.feels_like);
        setWind(data.wind.deg, data.wind.speed, data.wind.gust);
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
        setWeatherDesc(data.weather[0].description);
        setWeatherIcon(data.weather[0].icon);

        return currentWeather;
    } catch (error) {
        console.log(error);
        return;
    }
}

async function getData(location, units) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2909c8c3d099439dee84dc547fbf967d&units=${units}`, { mode: 'cors' });
    const weatherData = await response.json();

    if (response.ok) {
        return weatherData;
    } else {
        throw new Error('city not found');
    }
}

function setDateTime(dateTime) {
    const date = new Date(dateTime * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function pad(num) {
        if (Math.floor(num / 10) === 0) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    const d = {
        hours: pad(date.getUTCHours()),
        minutes: pad(date.getUTCMinutes()),
        weekday: days[date.getUTCDay()],
        month: months[date.getUTCMonth()],
        day: date.getUTCDate(),
    }

    currentWeather.dateTime = `${d.hours}:${d.minutes}, ${d.weekday}, ${d.month} ${d.day}`;
}

function setTemperatures(currTemp, realFeel) {
    currentWeather.temp = Math.round(currTemp);
    currentWeather.realFeel = Math.round(realFeel);
}

function setWind(deg, speed, gusts) {
    currentWeather.windDirection = degToDirection(deg);
    currentWeather.windSpeed = speed;
    currentWeather.windGusts = gusts;
}

function setHumidity(humidity) {
    currentWeather.humidity = humidity;
}

function setPressure(pressure) {
    currentWeather.pressure = pressure;
}

function setWeatherDesc(desc) {
    desc = Array.from(desc);
    desc[0] = desc[0].toUpperCase();
    currentWeather.weatherDesc = desc.join('');
}

function setWeatherIcon(iconCode) {
    currentWeather.weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function degToDirection(deg) {
    const num = Math.floor(deg / 22.5 + .5);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    return directions[num % 16];
}




/***/ }),

/***/ 26:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFutureForecast": () => (/* binding */ setFutureForecast)
/* harmony export */ });
async function setFutureForecast(location, units) {
    try {
        const data = await getData(location, units);
        console.log(data);

    } catch (error) {
        console.log(error);
        return;
    }
}

async function getData(location, units) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=2909c8c3d099439dee84dc547fbf967d&units=${units}`, { mode: 'cors' });
    const weatherData = await response.json();
    
    if (response.ok) {
        return weatherData;
    } else {
        throw new Error('city not found');
    }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CurrentWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _FutureForecast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);



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
    currentWeatherData = await (0,_CurrentWeather__WEBPACK_IMPORTED_MODULE_0__.setCurrentWeather)(location, units);
    console.log(currentWeatherData)
}

update(location, units);

(0,_FutureForecast__WEBPACK_IMPORTED_MODULE_1__.setFutureForecast)('Oakville', units);


})();

/******/ })()
;