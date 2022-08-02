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
            <p class="top">${data.date}</p>
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

export { displayCurrent };
