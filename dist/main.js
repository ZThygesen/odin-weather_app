/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentWeather": () => (/* binding */ currentWeather)
/* harmony export */ });
const currentWeather = (function () {
    const weather = {
        date: "",
        time: "",
        sunrise: "",
        sunset: "",
        location: "",
        country: "",
        temp: 0,
        realFeel: 0,
        weatherDesc: "",
        windDirection: "",
        windSpeed: "",
        humidity: 0,
        pressure: 0,
        weatherIcon: "",
        countryFlag: "",
    }

    const setCurrentWeather = async (location, units) => {
        try {
            const data = await getData(location, units);

            setDate(data.dt + data.timezone);
            setTime(data.dt + data.timezone);
            setSunrise(data.sys.sunrise + data.timezone);
            setSunset(data.sys.sunset + data.timezone);
            setLocation(data.name, data.sys.country);
            setTemperatures(data.main.temp, data.main.feels_like);
            setWind(data.wind.deg, data.wind.speed, units);
            setHumidity(data.main.humidity);
            setPressure(data.main.pressure);
            setWeatherDesc(data.weather[0].description);
            setWeatherIcon(data.weather[0].icon);
            setCountryFlag(data.sys.country);

            return weather;

        } catch (error) {
            return error;
        }
    }

    const getData = async (location, units) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2909c8c3d099439dee84dc547fbf967d&units=${units}`, { mode: 'cors' });
        const weatherData = await response.json();

        if (response.ok) {
            return weatherData;
        } else {
            throw new Error('city not found');
        }
    }

    const setDate = (date) => {
        const now = new Date();
        const d = new Date(((date + (now.getTimezoneOffset() * 60)) * 1000));
        
        const dateFormat = new Intl.DateTimeFormat('default', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });

        weather.date = dateFormat.format(d);
    }

    const setTime = (time) => {
        weather.time = getTime(time, new Date());
    }

    const setSunrise = (time) => {
        weather.sunrise = getTime(time, new Date());
    }

    const setSunset = (time) => {
        weather.sunset = getTime(time, new Date());
    }

    const setLocation = (location, country) => {
        weather.location = location;
        weather.country = country;
    }

    const setTemperatures = (currTemp, realFeel) => {
        weather.temp = Math.round(currTemp);
        weather.realFeel = Math.round(realFeel);
    }

    const setWind = (deg, speed, units) => {
        weather.windDirection = degToDirection(deg);

        if (units === 'imperial') {
            weather.windSpeed = `${Math.round(speed)} mph`;
        } else {
            weather.windSpeed = `${Math.round(speed)} m/s`;
        }
    }

    const setHumidity = (humidity) => {
        weather.humidity = humidity;
    }

    const setPressure = (pressure) => {
        weather.pressure = pressure;
    }

    const setWeatherDesc = (desc) => {
        desc = Array.from(desc);
        desc[0] = desc[0].toUpperCase();
        weather.weatherDesc = desc.join('');
    }

    const setWeatherIcon = (iconCode) => {
        weather.weatherIcon = `./images/weather_icons/${iconCode}.svg`;
    }

    const setCountryFlag = (country) => {
        weather.countryFlag = `https://countryflagsapi.com/png/${country}`;
    }

    const getTime = (time, now) => {
        const date = new Date(((time + (now.getTimezoneOffset() * 60)) * 1000));

        const dateFormat = new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
        });

        return dateFormat.format(date);
    }

    const degToDirection = (deg) => {
        const num = Math.floor(deg / 22.5 + .5);
        const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

        return directions[num % 16];
    }

    return { setCurrentWeather };
})();




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "futureForecast": () => (/* binding */ futureForecast)
/* harmony export */ });
const futureForecast = (function () {
    let forecasts = [];

    const setFutureForecast = async (location, units) => {
        try {
            const data = await getData(location, units);
            const timezone = data.city.timezone;
            forecasts = [];

            data.list.forEach(elem => {
                let data = {
                    date: setDate(elem.dt + timezone, new Date()),
                    time: setTime(elem.dt + timezone, new Date()),
                    temp: setTemp(elem.main.temp),
                    weatherDesc: setWeatherDesc(elem.weather[0].main),
                    weatherIcon: setWeatherIcon(elem.weather[0].icon),
                }
                forecasts.push(data);
            });

            return forecasts;

        } catch (error) {
            console.log(error);
            return;
        }
    }

    const getData = async (location, units) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=2909c8c3d099439dee84dc547fbf967d&units=${units}`, { mode: 'cors' });
        const weatherData = await response.json();
        
        if (response.ok) {
            return weatherData;
        } else {
            throw new Error('city not found');
        }
    }

    const setDate = (date, now) => {
        const d = new Date(((date + (now.getTimezoneOffset() * 60)) * 1000));
        const dateFormat = new Intl.DateTimeFormat('default', {
            weekday: 'short',
        });

        return dateFormat.format(d);
    }

    const setTime = (time, now) => {
        const t = new Date(((time + (now.getTimezoneOffset() * 60)) * 1000));
        const timeFormat = new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
        });

        return timeFormat.format(t);
    }

    const setTemp = (temp) => {
        return Math.round(temp);
    }

    const setWeatherDesc = (desc) => {
        return desc;
    }

    const setWeatherIcon = (iconCode) => {
        return `./images/weather_icons/${iconCode}.svg`;
    }

    return { setFutureForecast };
})();




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayCurrent": () => (/* binding */ displayCurrent)
/* harmony export */ });
const displayCurrent = (function () {
    const leftInfo = document.querySelector('.left-info');
    const centerInfo = document.querySelector('.center-info');
    const rightInfo = document.querySelector('.right');

    const display = (data) => {
        displayLeftData(data);
        displayCenterData(data);
        displayRightData(data);
    }

    const displayLeftData = (data) => {
        leftInfo.innerHTML = `
            <img class="icon" src="./images/thermometer.png" alt="RealFeel">
            <div class="info">
                <p>RealFeel</p>
                <p>${data.realFeel}°</p>
            </div>
            <img class="icon" src="./images/sunrise.png" alt="Sunrise">
            <div class="info">
                <p>Sunrise</p>
                <p>${data.sunrise}</p>
            </div>
            <img class="icon" src="./images/sunset.png" alt="Sunset">
            <div class="info">
                <p>Sunset</p>
                <p>${data.sunset}</p>
            </div>
        `;
    }

    const displayCenterData = (data) => {
        centerInfo.innerHTML = `
            <div id="location">
                <p>${data.location}, ${data.country}</p>
                <img id="flag" src="${data.countryFlag}" alt="Flag">
            </div>
            <p id="weather-desc">${data.weatherDesc}</p>
            <p id="time">${data.time}</p>
            <img id="curr-icon" src="${data.weatherIcon}" alt="Weather Icon">
            <p id="temp">${data.temp}°</p>
        `;
    }

    const displayRightData = (data) => {
        rightInfo.innerHTML = `
            <p class="top date">${data.date}</p>
            <div class="right-info">
                <div class="info">
                    <p>Wind</p>
                    <p>${data.windDirection} ${data.windSpeed}</p>
                </div>
                <img class="icon" src="./images/wind-direction.png" alt="Wind">
                <div class="info">
                    <p>Humidity</p>
                    <p>${data.humidity}%</p>
                </div>
                <img class="icon" src="./images/humidity.png" alt="Sunset">
                <div class="info">
                    <p>Pressure</p>
                    <p>${data.pressure} hPa</p>
                </div>
                <img class="icon" src="./images/pressure.png" alt="Gusts">
            </div>
        `;
    }

    return { display };
})();




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayFuture": () => (/* binding */ displayFuture)
/* harmony export */ });
const displayFuture = (function () {
    const container = document.querySelector('.future');

    const display = (data) => {
        container.innerHTML = '';
        data.forEach(elem => createElem(elem));
    }

    const createElem = (elem) => {
        const card = document.createElement('div');
        card.className = 'card-container';

        card.innerHTML = `
            <div class="card">
                <p>${elem.date}</p>
                <p>${elem.time}</p>
                <img src=${elem.weatherIcon} alt="Weather Icon">
                <p>${elem.temp}°</p>
                <p>${elem.weatherDesc}</p>
            </div>
        `;

        container.appendChild(card);
    }

    return { display };
})();




/***/ })
/******/ 	]);
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
/* harmony import */ var _FutureForecast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _DisplayCurrent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _DisplayFuture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);





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
    currentWeatherData = await _CurrentWeather__WEBPACK_IMPORTED_MODULE_0__.currentWeather.setCurrentWeather(location, units);
    futureForecastData = await _FutureForecast__WEBPACK_IMPORTED_MODULE_1__.futureForecast.setFutureForecast(location, units);

    if (currentWeatherData instanceof Error || futureForecastData instanceof Error) {
        error.textContent = 'Error: city not found';
        return;
    } else {
        error.textContent = '';
    }

    _DisplayCurrent__WEBPACK_IMPORTED_MODULE_2__.displayCurrent.display(currentWeatherData);
    _DisplayFuture__WEBPACK_IMPORTED_MODULE_3__.displayFuture.display(futureForecastData);
}

update(location, units);

setInterval(() => update(location, units), 3000);


})();

/******/ })()
;