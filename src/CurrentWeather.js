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

            console.log(data);

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

export { currentWeather };
