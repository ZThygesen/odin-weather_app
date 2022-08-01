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
            hour: 'numeric',
            minute: 'numeric',
        });

        return dateFormat.format(d);
    }

    const setTime = (time, now) => {
        const t = new Date(((time + (now.getTimezoneOffset() * 60)) * 1000));
        const timeFormat = new Intl.DateTimeFormat('default', {
            weekday: 'short',
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
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    }

    return { setFutureForecast };
})();

export { futureForecast };
