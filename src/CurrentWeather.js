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

export { setCurrentWeather };
