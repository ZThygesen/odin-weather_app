const futureForecast = (function () {
    const forecasts = [];

    const setFutureForecast = async (location, units) => {
        try {
            const data = await getData(location, units);
            const timezone = data.city.timezone;

            data.list.forEach(elem => {
                let data = {
                    date: setDate(elem.dt + timezone),
                    time: setTime(elem.dt + timezone),
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

    const setDate = (date) => {
        const d = new Date(date * 1000);
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

        return days[d.getUTCDay()];
    }

    const setTime = (time) => {
        const t = new Date(time * 1000);

        function pad(num) {
            if (Math.floor(num / 10) === 0) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        return `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}`;
    }

    const setTemp = (temp) => {
        return Math.round(temp);
    }

    const setWeatherDesc = (desc) => {
        return desc;
    }

    const setWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    }

    return { setFutureForecast };
})();

export { futureForecast };
