import { getKey } from "./key";

const apiController = (()=> {
    let key = getKey();


    const getLocation = async () => {
        
        let location = "Chicago";
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`, {mode: 'cors'});
        return await response.json();
        
    };

    const getWeatherData = async () => {
        const location = await getLocation();
        let lon = await location[0].lon;
        let lat = await location[0].lat;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units="metric"`, {mode:'cors'});
        return await response.json();
    
    };

    return {
        getLocation,
        getWeatherData
    };

})();

const unitConversions = (() => {
    const cToF = (celsius) => {
        return Math.round(((celsius * 1.8) * 100)) / 100 + 32;
    };

    return {
        cToF,
    }
})();

export {apiController, unitConversions}