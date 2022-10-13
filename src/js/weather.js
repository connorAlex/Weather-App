import { getKey } from "./key";

const apiController = (()=> {
    let key = getKey();
    let measurement = "metric";

    const toggleMeasurement = () => {
        if (measurement === "metric") {
            measurement = "imperial";
        } else{
            measurement = "metric";
        }
    };

    const getMeasurement = () => measurement;

    const getLocation = async (locationName) => {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${key}`, {mode: 'cors'});
        return await response.json();
    };

    const getWeatherData = async (locationName) => {
        const location = await getLocation(locationName);
        let lon = await location[0].lon;
        let lat = await location[0].lat;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`, {mode:'cors'});
        return await extractData(response.json());
    
    };

    const extractData = async (a) => {
        let data = await a;
        let obj = {
            locationName: data.name,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            weatherDesc: data.weather[0].description,
            humidity: data.main.humidity,
            visibility: data.visibility,
            windSpeed: data.wind.speed,
            clouds: data.clouds.all,
            tempLow: data.main.temp_min,
            tempHigh: data.main.temp_max
        }
        return obj;
    };

    return {
        toggleMeasurement,
        getWeatherData,
        getMeasurement
    };

})();

const unitConversion = (() => {
    const cToF = (celsius) => {
        return (celsius * 1.8 + 32).toPrecision(4);
    };

    const mpsToMph = (mps) => {
        return (mps * 2.236936).toPrecision(4);
    };

    return {
        cToF,
        mpsToMph
    }
})();

export {apiController, unitConversion}