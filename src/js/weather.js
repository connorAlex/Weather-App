import { getKey } from "./key";

const apiController = (()=> {

    const getWeatherData = () => {
        let lon = "41"
        let lat = '87';
        let key = getKey();
    
        async function getData() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`, {mode:'cors'});
            console.log(response);
        };
        getData();
        
    };

    return {
        getWeatherData
    };

})();

export {apiController}