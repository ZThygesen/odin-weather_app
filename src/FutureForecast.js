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

export { setFutureForecast };
